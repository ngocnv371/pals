import { createSlice } from "@reduxjs/toolkit";
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

interface State {
  their: Side;
  my: Side;
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
};

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {},
});

export const selectTheirHand = (state: RootState) => state.duel.their.hand;

export const selectMyHand = (state: RootState) => state.duel.my.hand;

export const selectTheirDeployed = (state: RootState) =>
  state.duel.their.deployed;

export const selectMyDeployed = (state: RootState) => state.duel.my.deployed;

export const selectTheirSupports = (state: RootState) =>
  state.duel.their.supports;

export const selectMySupports = (state: RootState) => state.duel.my.supports;

export const {} = duelSlice.actions;

export default duelSlice.reducer;
