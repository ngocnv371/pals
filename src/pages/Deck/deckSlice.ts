import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Chance } from "chance";
import { nanoid } from "nanoid";
import pals from "../../data/pals.json";

const chance = new Chance();

export interface DeckItem {
  id: string;
  type: string;
}

const adapter = createEntityAdapter<DeckItem>();

function generateItem(): DeckItem {
  return {
    id: nanoid(),
    type: chance.pickone(pals).id,
  };
}

const initialState = adapter.addMany(
  adapter.getInitialState(),
  chance.n(generateItem, 4)
);

export const duelSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    added(state, action: PayloadAction<DeckItem>) {
      adapter.addOne(state, action.payload);
    },
  },
});

export const { selectAll: selectAllDeckItems } = adapter.getSelectors();

export const { added } = duelSlice.actions;

export default duelSlice.reducer;
