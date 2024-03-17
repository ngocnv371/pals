import { PayloadAction } from "@reduxjs/toolkit";
import { breedPals } from "../../pals/service";
import { Result, Fusion, Side, State, Stage, Stance } from "./model";
import { getConfig } from "../../config/service";
import { linearScale } from "../../../utils/linearScale";

const HAND_SIZE = 5;

function getInitialSide(): Side {
  return {
    level: 0,
    life: 0,
    deck: [],
    deployed: [null, null, null, null, null],
    supports: [null, null, null, null, null],
    graveyard: [],
    hand: [],
    deploymentPlan: null,
    offensivePlan: null,
  };
}

function getInitialState(): State {
  return {
    my: getInitialSide(),
    their: getInitialSide(),
    battle: null,
    fusion: null,
    dungeon: null,
    result: Result.Unresolved,
    spotlightIndex: null,
    stage: Stage.Started,
    turn: -1,
  };
}

function getCurrentSide(state: State) {
  return [state.my, state.their][state.turn % 2];
}

function getOtherSide(state: State) {
  return [state.their, state.my][state.turn % 2];
}

function nextTurn(state: State) {
  state.turn++;
  console.debug("new turn", state.turn);
  state.battle = null;
  state.fusion = null;
  state.spotlightIndex = null;
  resetUnitActions(state);

  advanceTo(state, Stage.Drawing);
  drawCards(state);
}

function getDeckSize(level: number) {
  if (level <= 0) {
    return 1;
  }

  const config = getConfig().deck.size.scale.byLevel;
  if (level >= config.level) {
    return config.linear.to;
  }

  const scale = linearScale(
    config.linear.from,
    config.linear.to,
    config.level - 1
  );
  const value = scale.find((i) => i > level) || 1;
  return Math.floor(value);
}

function start(
  state: State,
  {
    payload: { my, their },
  }: PayloadAction<{
    my: Pick<Side, "deck" | "level" | "life">;
    their: Pick<Side, "deck" | "level" | "life">;
  }>
) {
  const initial = getInitialState();
  const params = {
    my: {
      ...initial.my,
      ...my,
    },
    their: {
      ...initial.their,
      ...their,
    },
  };
  Object.assign(state, params);
  advanceTo(state, Stage.Drawing);
}

function resetUnitActions(state: State) {
  getCurrentSide(state).deployed.forEach((d) => d && (d.acted = false));
}

/**
 * attempt to fill the hand with cards from deck
 * @returns number of drawn cards
 */
function drawCards(state: State) {
  if (state.stage !== Stage.Drawing) {
    console.error("invalid stage");
    return;
  }

  console.debug("draw cards");
  if (state.turn >= 0) {
    const cardsInDeck = getCurrentSide(state).deck.length;
    if (cardsInDeck <= 0) {
      console.debug("out of cards");
      advanceTo(state, Stage.PresentingHand);
      return;
    }
  }

  state.turn++;
  const neededCards = HAND_SIZE - getCurrentSide(state).hand.length;
  if (neededCards <= 0) {
    console.debug("hand is full");
    advanceTo(state, Stage.PresentingHand);
    return;
  }

  const items = getCurrentSide(state).deck.splice(0, neededCards);
  getCurrentSide(state).hand = getCurrentSide(state).hand.concat(items);
  console.debug("drawn", items);
  advanceTo(state, Stage.PresentingHand);
}

function selectCardsForDeployment(
  state: State,
  { payload: { indices } }: PayloadAction<{ indices: number[] }>
) {
  if (state.stage !== Stage.PresentingHand) {
    console.error("invalid stage");
    return;
  }

  console.debug(
    "select cards",
    indices.map((i) => getCurrentSide(state).hand[i])
  );
  getCurrentSide(state).deploymentPlan = {
    handIndices: indices,
    queue: [],
    unitIndex: null,
  };
}

function endSelectingCardsForDeployment(state: State) {
  if (state.stage !== Stage.PresentingHand) {
    console.error("invalid stage");
    return;
  }

  advanceTo(state, Stage.PresentingDeploymentFormation);
}

function selectTargetDeploymentPosition(
  state: State,
  { payload: { index } }: PayloadAction<{ index: number }>
) {
  if (state.stage !== Stage.PresentingDeploymentFormation) {
    console.error("invalid stage");
    return;
  }

  const plan = getCurrentSide(state).deploymentPlan;
  if (!plan) {
    console.error("deployment plan missing");
    return;
  }

  plan.unitIndex = index;

  // calculate fusion queue
  plan.queue = plan.handIndices
    .map((idx) => getCurrentSide(state).hand[idx])
    .concat(getCurrentSide(state).deployed[index]?.cardId || "")
    .filter(Boolean);
  console.debug("fusion queue", plan.queue);

  advanceTo(state, Stage.FusionQueue);
  fuse(state);
}

function fuse(state: State) {
  if (state.stage !== Stage.FusionQueue) {
    console.error("invalid stage");
    return;
  }

  const side = getCurrentSide(state);
  const plan = side.deploymentPlan;
  if (!plan) {
    console.error("deployment plan missing");
    return;
  }

  if (plan.queue.length < 1) {
    console.error("fusion queue invalid");
    return;
  }

  if (plan.queue.length == 1) {
    console.debug("queue finished");
    side.deployed[plan.unitIndex!] = {
      cardId: plan.queue[0],
      stance: Stance.Offensive,
      acted: false,
    };
    advanceTo(state, Stage.PresentingBattleFormation);
    return;
  }

  const [card1, card2] = plan.queue.splice(0, 2);
  const result = breedPals(card1, card2);
  console.debug(`fused ${card1} + ${card2} => ${result}`);
  state.fusion = {
    card1,
    card2,
    result,
  };
  advanceTo(state, Stage.Fusion);
}

function endFusion(state: State) {
  if (state.stage !== Stage.Fusion) {
    console.error("invalid stage");
    return;
  }

  const { result } = state.fusion!;
  if (!result) {
    console.error("fusion result missing");
    return;
  }

  console.debug("update queue");
  const plan = getCurrentSide(state).deploymentPlan!;
  plan.queue = [result, ...plan.queue];

  advanceTo(state, Stage.FusionQueue);
  fuse(state);
}

function skipDeployment(state: State) {
  if (state.stage !== Stage.PresentingHand) {
    console.error("invalid stage");
    return;
  }

  console.debug("skip deployment");
  advanceTo(state, Stage.PresentingBattleFormation);
}

function selectUnitForBattle(
  state: State,
  { payload: { index } }: PayloadAction<{ index: number }>
) {
  if (state.stage !== Stage.PresentingBattleFormation) {
    console.error("invalid stage");
    return;
  }

  console.debug(
    "selected unit for battle",
    getCurrentSide(state).deployed[index]?.cardId
  );
  getCurrentSide(state).offensivePlan = {
    unitIndex: index,
    targetUnitIndex: null,
  };

  advanceTo(state, Stage.PresentingTargets);
}

function selectTargetUnitForBattle(
  state: State,
  { payload: { index } }: PayloadAction<{ index: number }>
) {
  if (state.stage !== Stage.PresentingTargets) {
    console.error("invalid stage");
    return;
  }

  const plan = getCurrentSide(state).offensivePlan;
  if (!plan) {
    console.error("offensive plan missing");
    return;
  }

  console.debug(
    "selected target unit",
    getOtherSide(state).deployed[index]?.cardId
  );

  plan.targetUnitIndex = index;

  advanceTo(state, Stage.BattleVisualizer);
}

function endBattle(state: State) {
  if (state.stage !== Stage.PresentingBattleFormation) {
    console.error("invalid stage");
    return;
  }

  console.debug("skip battle");
  nextTurn(state);
}

function switchUnitToDefensive(
  state: State,
  { payload: { index } }: PayloadAction<{ index: number }>
) {
  if (state.stage !== Stage.PresentingBattleFormation) {
    console.error("invalid stage");
    return;
  }

  const unit = getCurrentSide(state).deployed[index];
  if (!unit || !unit.cardId) {
    console.error("invalid unit");
    return;
  }

  console.debug("switch unit to defensive", unit.cardId);
  unit.acted = true;
  unit.stance = Stance.Defensive;
}

function surrender(state: State) {
  console.debug("surrendered");
  state.result = Result.Loose;
  advanceTo(state, Stage.Ended);
}

function advanceTo(state: State, stage: Stage) {
  console.debug("advancing to", stage);
  state.stage = stage;
}

export const internalServices = {
  getInitialState,
  advanceTo,
  surrender,
  switchUnitToDefensive,
  endBattle,
  selectCardsForDeployment,
  selectTargetDeploymentPosition,
  selectTargetUnitForBattle,
  skipDeployment,
  start,
  selectUnitForBattle,
  fuse,
  endSelectingCardsForDeployment,
  drawCards,
  getDeckSize,
  endFusion,
};
