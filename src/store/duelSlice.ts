import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
}

export type Formation = (Cell | null)[];

export interface Side {
  deck: string[];
  hand: string[];
  deployed: Formation;
  supports: Formation;
  spotIndex?: number;
  fusionQueue: string[];
  fusingCards: string[];
}

export enum DuelStage {
  Start = "Start",
  MyDrawing = "MyDrawing",
  MyPlacing = "MyPlacing",
  MyFusion = "MyFusion",
  MyAttack = "MyAttack",
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
  };
  side.fusingCards = [];
  side.fusionQueue = [];
}

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {
    myCardsDrawed(state, action: PayloadAction<number>) {
      if (state.my.hand.length < 5) {
        draw(state.my, action.payload);
      }
      state.stage = DuelStage.MyDrawing;
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

export const selectStage = (state: RootState) => state.duel.stage;

export const { myCardsDrawed, myHandCardsSelected, mySpotSelected } =
  duelSlice.actions;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type SideSelector = (state: State) => Side;
function withSide(selector: SideSelector, fuseAction: any, placeAction: any) {
  const fuseAllAndPlace =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      while (selector(getState().duel).fusionQueue.length >= 2) {
        dispatch(fuseAction);
        console.debug("delay, wait for animation");
        await delay(6000);
      }
      console.debug("done fusing, now place");
      dispatch(placeAction);
    };
  return fuseAllAndPlace;
}

export const myFuseAndPlace = withSide(
  (state) => state.my,
  duelSlice.actions.myFused(),
  duelSlice.actions.myPlaced()
);

export default duelSlice.reducer;
