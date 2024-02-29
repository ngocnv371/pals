import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chance } from "chance";
import pals from "../data/pals.json";
import { RootState } from "./store";

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
}

export enum DuelStage {
  MyDrawing = "MyDrawing",
  MyPlacing = "MyPlacing",
  MyAttack = "MyAttack",
  TheirDrawing = "TheirDrawing",
  TheirPlacing = "TheirPlacing",
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
  their: {
    deck: chance.n(() => chance.pickone(pals).id, 30),
    hand: chance.n(() => chance.pickone(pals).id, 5),
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
  },
  my: {
    deck: chance.n(() => chance.pickone(pals).id, 30),
    hand: chance.n(() => chance.pickone(pals).id, 5),
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
  },
  stage: DuelStage.MyDrawing,
};

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

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {
    myCardsDrawed(state, action: PayloadAction<number>) {
      draw(state.my, action.payload);
    },
    theirCardsDrawed(state, action: PayloadAction<number>) {
      draw(state.their, action.payload);
    },
    myHandCardsSelected(state, action: PayloadAction<string[]>) {
      state.stage = DuelStage.MyPlacing;
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

export const { myCardsDrawed, theirCardsDrawed, myHandCardsSelected } =
  duelSlice.actions;

export default duelSlice.reducer;
