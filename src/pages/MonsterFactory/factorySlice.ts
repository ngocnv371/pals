import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { generateDetail } from "./service";
import { delay } from "../Duel/utils/delay";
import {
  saveBeastiaryData,
  selectAll,
  selectUnfilledCount,
  updated,
} from "./beastiarySlice";

const initialState = {
  aborted: true,
  currentIds: [] as string[],
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
    fillStarted(state, action: PayloadAction<string[]>) {
      state.currentIds = action.payload;
    },
    fillCompleted(state, action: PayloadAction<number>) {
      state.completed += action.payload;
      state.currentIds = [];
    },
    batchStarted(state, action: PayloadAction<number>) {
      state.completed = 0;
      state.total = action.payload;
      state.aborted = false;
    },
  },
});

export const selectProgress = createSelector(
  (state: RootState) => state.factory.completed,
  (state: RootState) => state.factory.total,
  (completed, total) => ({ completed, total })
);

export const selectCurrentMonsters = createSelector(
  (state: RootState) => state.factory.currentIds,
  (state: RootState) => state.beastiary.entities,
  (currentIds, entities) => currentIds.map((c) => entities[c])
);

export const { aborted } = factorySlice.actions;

export const startBatchFill =
  (batchSize: number, onDone: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const total = selectUnfilledCount(getState());
    dispatch(factorySlice.actions.batchStarted(total));
    dispatch(batchFill(batchSize, onDone));
  };

const batchFill =
  (batchSize: number, onDone: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().factory;
    if (state.aborted) {
      console.debug("aborted", state);
      return onDone();
    }

    // get one
    const unfilledItems = selectAll(getState()).filter((d) => !d.name);
    const items = unfilledItems.slice(0, batchSize);

    if (!items.length) {
      console.debug("all is filled", state);
      return onDone();
    }

    const ids = items.map((i) => i.id);
    dispatch(factorySlice.actions.fillStarted(ids));
    console.debug("start smart fill", ids);

    try {
      const updatedItems = await generateDetail(items);
      updatedItems.forEach((i) =>
        dispatch(
          updated({
            id: i.id,
            changes: i,
          })
        )
      );

      dispatch(factorySlice.actions.fillCompleted(ids.length));

      await delay(100);
      dispatch(saveBeastiaryData());

      await delay(100);
      dispatch(batchFill(batchSize, onDone));
    } catch (e) {
      console.error(e);
      dispatch(factorySlice.actions.aborted(true));
      onDone();
    }
  };

export default factorySlice.reducer;
