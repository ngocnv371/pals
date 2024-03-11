import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Monster } from "./model";
import { AppDispatch, AppThunkAction, RootState } from "../../store";
import { saveAs } from "file-saver";

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
    removed: adapter.removeOne,
    updated: adapter.updateOne,
  },
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.beastiary
);

export const { added, removed, updated } = beastiarySlice.actions;

const STORAGE_KEY = "beastiary";
export const saveBeastiaryData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().beastiary;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

export const loadBeastiaryData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const json = window.localStorage.getItem(STORAGE_KEY);
    if (!json) {
      return;
    }

    try {
      const data = JSON.parse(json);
      dispatch(beastiarySlice.actions.load(data));
    } catch (e) {
      console.error("failed to load beastiary", e);
    }
  };

export default beastiarySlice.reducer;
