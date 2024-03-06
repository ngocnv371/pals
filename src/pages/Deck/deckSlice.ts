import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { Chance } from "chance";
import { DeckItem } from "./model";
import { generateItem } from "./service";
import { RootState } from "../../store";
const chance = new Chance();

const adapter = createEntityAdapter<DeckItem>();

const initialState = adapter.addMany(
  adapter.getInitialState(),
  chance.n(() => generateItem(), 5)
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    added: adapter.addOne,
  },
});

export const { selectAll: selectAllDeckItems, selectById: selectDeckItemById } =
  adapter.getSelectors((state: RootState) => state.deck);

export const { added } = deckSlice.actions;

export default deckSlice.reducer;
