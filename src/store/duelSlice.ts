import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Chance } from "chance";
import pals from "../data/pals.json";
import { AppDispatch, RootState } from "./store";
import breed from "../data/palBreed";
import getPalMetadata, { getPalMetadataById } from "../data/palMetadata";

export enum CardStance {
  Offensive,
  Defensive,
}

export interface Cell {
  cardId: string;
  stance: CardStance;
  attacked: boolean;
}

export type Formation = (Cell | null)[];

export interface Side {
  life: number;
  deck: string[];
  hand: string[];
  deployed: Formation;
  supports: Formation;
  spotIndex?: number;
  fusionQueue: string[];
  fusingCards: string[];
  attacking?: {
    offensiveIndex?: number;
    targetIndex?: number;
  };
}

export enum DuelStage {
  Start = "Start",
  MyDrawing = "MyDrawing",
  MyPlacing = "MyPlacing",
  MyFusion = "MyFusion",
  MyAttack = "MyAttack",
  MyTargetting = "MyTargetting",
  MyBattle = "MyBattle",
  TheirDrawing = "TheirDrawing",
  TheirPlacing = "TheirPlacing",
  TheirFusion = "TheirFusion",
  TheirAttack = "TheirAttack",
  End = "End",
}

interface State {
  their: Side;
  my: Side;
  stage: DuelStage;
}

const chance = new Chance();
const initialState: State = {
  their: generateSide(),
  my: generateSide(),
  stage: DuelStage.Start,
};

function generateSide(): Side {
  return {
    life: 4000,
    deck: chance.n(() => chance.pickone(pals).id, 30),
    hand: [],
    deployed: chance.n(
      () =>
        chance.bool()
          ? {
              cardId: chance.pickone(pals).id,
              stance: chance.bool()
                ? CardStance.Offensive
                : CardStance.Defensive,
              attacked: false,
            }
          : null,
      5
    ),
    supports: [null, null, null, null, null],
    fusionQueue: [],
    fusingCards: [],
  };
}

function draw(side: Side, qty: number) {
  const bag = [];
  for (let i = 0; i < qty; i++) {
    const item = side.deck.pop();
    if (!item) {
      break;
    }

    bag.push(item);
  }
  side.hand = side.hand.concat(bag);
}

function selectHandCards(side: Side, cards: string[]) {
  side.fusionQueue = cards;
  cards.forEach((c) => {
    const idx = side.hand.indexOf(c);
    if (idx >= 0) {
      side.hand.splice(idx, 1);
    }
  });
}

function selectSpot(side: Side, index: number) {
  side.spotIndex = index;
  if (side.deployed[index]?.cardId) {
    side.fusionQueue = side.fusionQueue.concat(side.deployed[index]!.cardId);
    side.deployed[index] = null;
  }
}

function fuse(id1: string, id2: string): string {
  const c1 = getPalMetadataById(id1);
  const c2 = getPalMetadataById(id2);
  const title = breed(c1.title, c2.title);
  const c3 = getPalMetadata(title || "Rooby");
  return c3.id;
}

function fuseTop(side: Side) {
  if (side.fusionQueue.length < 2) {
    return;
  }

  const [c1, c2, ...rest] = side.fusionQueue;
  const c = fuse(c1, c2);
  side.fusingCards = [c1, c2, c];
  console.debug(`fusing ${c1} and ${c2} into ${c}`);
  side.fusionQueue = [c, ...rest];
}

function placeCard(side: Side) {
  side.deployed[side.spotIndex!] = {
    cardId: side.fusionQueue[0],
    stance: CardStance.Offensive,
    attacked: false,
  };
  side.fusingCards = [];
  side.fusionQueue = [];
  side.attacking = {};
}

function changeStanceToDefensive(side: Side, index: number) {
  side.deployed[index]!.stance = CardStance.Defensive;
}

function selectOffensiveCard(side: Side, index: number) {
  side.attacking!.offensiveIndex = index;
}

function selectTargetCard(side: Side, index: number) {
  side.attacking!.targetIndex = index;
}

/**
 * returns positive if card1 wins
 * @param card1
 * @param card2
 * @returns
 */
export function simulateBattle(
  card1: string,
  card2: string,
  card2Stance: CardStance
) {
  const c1 = getPalMetadataById(card1);
  const c2 = getPalMetadataById(card2);
  const life1 = c1.content.baseAttack;
  const life2 =
    card2Stance == CardStance.Offensive
      ? c2.content.baseAttack
      : c2.content.defense;
  const result = life1 - life2;
  console.debug(
    `simulate a fight: ${card1} (${life1}) vs ${card2} (${life2}) -> ${result}`
  );
  return result;
}

function endBattle(side: Side, other: Side) {
  const [card1, card2] = getAttack(side, other)!;
  const life = simulateBattle(
    card1,
    card2,
    other.deployed[side.attacking!.targetIndex!]?.stance!
  );
  if (life > 0) {
    other.life -= life;
    if (other.life < 0) {
      other.life = 0;
    }
    other.deployed[side.attacking?.targetIndex!] = null;
    side.deployed[side.attacking?.offensiveIndex!]!.attacked = true;
    side.deployed[side.attacking?.offensiveIndex!]!.stance =
      CardStance.Offensive;
  } else if (life < 0) {
    side.life += life;
    if (side.life < 0) {
      side.life = 0;
    }
    side.deployed[side.attacking?.offensiveIndex!] = null;
  } else {
    side.deployed[side.attacking?.offensiveIndex!] = null;
    other.deployed[side.attacking?.targetIndex!] = null;
  }

  side.attacking = {};
}

function endTurn(side: Side) {
  side.attacking = {};
  side.fusingCards = [];
  side.fusionQueue = [];
  side.spotIndex = undefined;
}

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {
    myCardsDrawed(state) {
      const qty = 5 - state.my.hand.length;
      if (qty <= 0) {
        return;
      }

      draw(state.my, qty);
      state.stage = DuelStage.MyDrawing;
    },
    theirCardsDrawed(state) {
      const qty = 5 - state.their.hand.length;
      if (qty <= 0) {
        return;
      }

      draw(state.their, qty);
      state.stage = DuelStage.TheirDrawing;
    },
    myHandCardsSelected(state, action: PayloadAction<string[]>) {
      if (state.stage !== DuelStage.MyDrawing) {
        return;
      }
      selectHandCards(state.my, action.payload);
      state.stage = DuelStage.MyPlacing;
    },
    mySpotSelected(state, action: PayloadAction<number>) {
      if (state.stage !== DuelStage.MyPlacing) {
        return;
      }
      selectSpot(state.my, action.payload);
      state.stage = DuelStage.MyFusion;
    },
    myFused(state) {
      if (state.stage !== DuelStage.MyFusion) {
        return;
      }
      fuseTop(state.my);
    },
    myPlaced(state) {
      if (state.stage !== DuelStage.MyFusion) {
        return;
      }
      placeCard(state.my);
    },
    myAttackStarted(state) {
      state.stage = DuelStage.MyAttack;
    },
    myStanceChangedToDefensive(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      changeStanceToDefensive(state.my, action.payload.index);
    },
    myOffensiveCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectOffensiveCard(state.my, action.payload.index);
      state.stage = DuelStage.MyTargetting;
    },
    myTargetCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectTargetCard(state.my, action.payload.index);
    },
    myBattleStarted(state) {
      state.stage = DuelStage.MyBattle;
    },
    myBattleEnded(state) {
      endBattle(state.my, state.their);
    },
    myTurnEnded(state) {
      endTurn(state.my);
      state.stage = DuelStage.TheirDrawing;
    },
  },
});

export const selectTheirHand = (state: RootState) => state.duel.their.hand;

export const selectMyHand = (state: RootState) => state.duel.my.hand;

export const selectTheirDeployed = (state: RootState) =>
  state.duel.their.deployed;

export const selectMyDeployed = (state: RootState) => state.duel.my.deployed;

export const selectTheirSupports = (state: RootState) =>
  state.duel.their.supports;

export const selectMySupports = (state: RootState) => state.duel.my.supports;

function getAttack(side: Side, otherSide: Side) {
  if (!side.attacking) {
    return null;
  }

  const { offensiveIndex, targetIndex } = side.attacking;
  const mine = side.deployed[offensiveIndex!]!.cardId;
  const other = otherSide.deployed[targetIndex!]!.cardId;
  return [mine, other];
}

export const selectMyAttack = createSelector(
  (state: RootState) => state.duel.my,
  (state: RootState) => state.duel.their,
  (my, their) => getAttack(my, their)
);

export const selectTheirAttack = createSelector(
  (state: RootState) => state.duel.my,
  (state: RootState) => state.duel.their,
  (my, their) => getAttack(their, my)
);

export const selectStage = (state: RootState) => state.duel.stage;

export const {
  myCardsDrawed,
  myHandCardsSelected,
  mySpotSelected,
  myStanceChangedToDefensive,
  myOffensiveCardSelected,
  myTargetCardSelected,
  myTurnEnded,
} = duelSlice.actions;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type SideSelector = (state: State) => Side;
function fuseAndPlace(
  selector: SideSelector,
  fuseAction: any,
  placeAction: any,
  attackAction: any
) {
  const fuseAllAndPlace =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      while (selector(getState().duel).fusionQueue.length >= 2) {
        dispatch(fuseAction);
        console.debug("delay, wait for animation");
        await delay(4000);
      }
      console.debug("done fusing, now place");
      dispatch(placeAction);
      dispatch(attackAction);
    };
  return fuseAllAndPlace;
}

export const myFuseAndPlace = fuseAndPlace(
  (state) => state.my,
  duelSlice.actions.myFused(),
  duelSlice.actions.myPlaced(),
  duelSlice.actions.myAttackStarted()
);

function battle(
  selector: SideSelector,
  startAction: any,
  endAction: any,
  attackAction: any,
  doneAction: any
) {
  const fuseAllAndPlace =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      console.debug("attack!!");
      dispatch(startAction);
      await delay(4000);
      dispatch(endAction);
      if (selector(getState().duel).deployed.some((d) => !d?.attacked)) {
        dispatch(attackAction);
      } else {
        dispatch(doneAction);
      }
    };
  return fuseAllAndPlace;
}

export const myBattle = battle(
  (state) => state.my,
  duelSlice.actions.myBattleStarted(),
  duelSlice.actions.myBattleEnded(),
  duelSlice.actions.myAttackStarted(),
  duelSlice.actions.theirCardsDrawed()
);

export default duelSlice.reducer;
