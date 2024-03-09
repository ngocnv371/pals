import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Monster } from "./model";
import { RootState } from "../../store";

const adapter = createEntityAdapter<Monster>();

const initialState = adapter.getInitialState();

const beastiarySlice = createSlice({
  name: "beastiary",
  initialState,
  reducers: {
    added: adapter.addOne,
    removed: adapter.removeOne,
    updated: adapter.updateOne,
  },
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.beastiary
);

export const { added, removed, updated } = beastiarySlice.actions;

export default beastiarySlice.reducer;
