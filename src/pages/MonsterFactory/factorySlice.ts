import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Monster, classes } from "./model";
import { AppDispatch, AppThunkAction, RootState } from "../../store";
import { saveAs } from "file-saver";
import { extractInfo, generateDetail, generateMonsters } from "./service";
import { delay } from "../Duel/utils/delay";
import { getGpt } from "../GPT/service";
import {
  saveBeastiaryData,
  selectAll,
  selectUnfilledCount,
  updated,
} from "./beastiarySlice";

const initialState = {
  aborted: true,
  currentId: "",
  completed: 0,
  total: 0,
};

const factorySlice = createSlice({
  name: "factory",
  initialState,
  reducers: {
    aborted(state, action: PayloadAction<boolean>) {
      state.aborted = action.payload;
    },
    fillStarted(state, action: PayloadAction<string>) {
      state.currentId = action.payload;
    },
    fillCompleted(state) {
      state.completed += 1;
      state.currentId = "";
    },
    batchStarted(state, action: PayloadAction<number>) {
      state.completed = 0;
      state.total = action.payload;
    },
  },
});

export const selectProgress = createSelector(
  (state: RootState) => state.factory.completed,
  (state: RootState) => state.factory.total,
  (completed, total) => ({ completed, total })
);

export const { aborted } = factorySlice.actions;

export const startBatchFill =
  (onDone: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().factory;
    if (state.aborted) {
      console.debug("aborted", state);
      return onDone();
    }

    const total = selectUnfilledCount(getState());
    dispatch(factorySlice.actions.batchStarted(total));
    dispatch(batchFill(onDone));
  };

const batchFill =
  (onDone: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().factory;
    if (state.aborted) {
      console.debug("aborted", state);
      return onDone();
    }

    // get one
    const items = selectAll(getState());
    const item = items.find((d) => !d.name);
    if (!item) {
      console.debug("all is filled", state);
      return onDone();
    }

    dispatch(factorySlice.actions.fillStarted(item.id));
    console.debug("start smart fill", item);

    const msg = await generateDetail(item);
    const info = extractInfo(msg);
    if (!info) {
      console.error("failed to generate info", info);
      return;
    }

    dispatch(
      updated({
        id: item.id,
        changes: info,
      })
    );

    dispatch(factorySlice.actions.fillCompleted());

    await delay(100);
    dispatch(saveBeastiaryData());

    await delay(100);
    dispatch(batchFill(onDone));
  };

export default factorySlice.reducer;
