import { PayloadAction } from "@reduxjs/toolkit";
import { breedPals } from "../../pals/service";
import { Result, Fusion, Side, State, Stage, Stance } from "./model";

const HAND_SIZE = 5;

export function getInitialSide(): Side {
  return {
    level: 0,
    life: 0,
    deck: [],
    deployed: [],
    graveyard: [],
    hand: [],
    deploymentPlan: null,
    offensivePlan: null,
  };
}

export function getInitialState(): State {
  return {
    my: getInitialSide(),
    their: getInitialSide(),
    battle: null,
    fusion: null,
    dungeon: null,
    result: Result.Unresolved,
    spotlightIndex: null,
    stage: Stage.Started,
    turn: 0,
  };
}

export function getCurrentSide(state: State) {
  return [state.my, state.their][state.turn % 2];
}

export function getOtherSide(state: State) {
  return [state.their, state.my][state.turn % 2];
}

export function nextTurn(state: State) {
  state.turn++;
  console.debug("new turn", state.turn);
  state.battle = null;
  state.fusion = null;
  state.spotlightIndex = null;
  resetUnitActions(state);

  advanceTo(state, Stage.Drawing);
}

export function resetUnitActions(state: State) {
  getCurrentSide(state).deployed.forEach((d) => (d.acted = false));
}

/**
 * attempt to fill the hand with cards from deck
 * @returns number of drawn cards
 */
export function drawCards(state: State) {
  if (state.stage !== Stage.Drawing) {
    console.error("invalid stage");
    return;
  }

  console.debug("draw cards");
  const cardsInDeck = getCurrentSide(state).deck.length;
  if (cardsInDeck <= 0) {
    console.debug("out of cards");
    advanceTo(state, Stage.PresentingHand);
    return;
  }

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

export function selectCardsForDeployment(
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
  advanceTo(state, Stage.PresentingDeploymentFormation);
}

export function selectTargetDeploymentPosition(
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
    .concat(getCurrentSide(state).deployed[index].cardId)
    .filter(Boolean);
  console.debug("fusion queue", plan.queue);

  advanceTo(state, Stage.FusionQueue);
}

export function fuse(state: State) {
  if (state.stage !== Stage.FusionQueue) {
    console.error("invalid stage");
    return;
  }

  const plan = getCurrentSide(state).deploymentPlan;
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
    advanceTo(state, Stage.Placing);
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

export function skipDeployment(state: State) {
  if (state.stage !== Stage.PresentingHand) {
    console.error("invalid stage");
    return;
  }

  console.debug("skip deployment");
  advanceTo(state, Stage.Battle);
}

export function selectUnitForBattle(
  state: State,
  { payload: { index } }: PayloadAction<{ index: number }>
) {
  if (state.stage !== Stage.PresentingBattleFormation) {
    console.error("invalid stage");
    return;
  }

  console.debug(
    "selected unit for battle",
    getCurrentSide(state).deployed[index].cardId
  );
  getCurrentSide(state).offensivePlan = {
    unitIndex: index,
    targetUnitIndex: null,
  };

  advanceTo(state, Stage.PresentingTargets);
}

export function selectTargetUnitForBattle(
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
    getOtherSide(state).deployed[index].cardId
  );

  plan.targetUnitIndex = index;

  advanceTo(state, Stage.BattleVisualizer);
}

export function endBattle(state: State) {
  if (state.stage !== Stage.Battle) {
    console.error("invalid stage");
    return;
  }

  console.debug("skip battle");
  nextTurn(state);
}

export function switchUnitToDefensive(
  state: State,
  { payload: { index } }: PayloadAction<{ index: number }>
) {
  if (state.stage !== Stage.Battle) {
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

export function surrender(state: State) {
  console.debug("surrendered");
  state.result = Result.Loose;
  advanceTo(state, Stage.Ended);
}

export function advanceTo(state: State, stage: Stage) {
  console.debug("advancing to", stage);
  state.stage = stage;
}
