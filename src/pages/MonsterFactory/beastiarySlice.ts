import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Monster, classes } from "./model";
import { AppDispatch, RootState } from "../../store";
import { generateMonsters, loadData, saveData } from "./service";

const adapter = createEntityAdapter<Monster>();

const initialState = adapter.getInitialState();

const beastiarySlice = createSlice({
  name: "beastiary",
  initialState,
  reducers: {
    load(state, action: PayloadAction<typeof initialState>) {
      state.entities = action.payload.entities;
      state.ids = action.payload.ids;
    },
    added: adapter.addOne,
    manyAdded: adapter.addMany,
    removed: adapter.removeOne,
    updated: adapter.updateOne,
  },
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.beastiary
);

export const { added, removed, updated } = beastiarySlice.actions;

export const saveBeastiaryData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().beastiary;
    saveData(state);
  };

export const loadBeastiaryData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const data = loadData();
      if (!data) {
        return;
      }
      dispatch(beastiarySlice.actions.load(data));
    } catch (e) {
      console.error("failed to load beastiary", e);
    }
  };

export const batchCreate =
  (quantities: number[]) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const items = quantities.flatMap((q, idx) =>
      generateMonsters(q, classes[idx])
    );
    console.debug("batch created", items);
    dispatch(beastiarySlice.actions.manyAdded(items));
  };

export default beastiarySlice.reducer;
