import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store/store";
import {
  saveBeastiaryData,
  selectAll,
  updated,
} from "../MonsterFactory/beastiarySlice";
import { generateImages } from "./service";
import { delay } from "../Duel/utils/delay";

const initialState = {
  currentId: "",
  aborted: true,
  completed: 0,
  total: 0,
};

const visualizerSlice = createSlice({
  name: "visualizer",
  initialState,
  reducers: {
    sessionStarted(state, action: PayloadAction<number>) {
      state.aborted = false;
      state.total = action.payload;
      state.completed = 0;
    },
    itemStarted(state, action: PayloadAction<string>) {
      state.currentId = action.payload;
    },
    itemCompleted(state) {
      state.currentId = "";
      state.completed += 1;
    },
    sessionAborted(state) {
      state.aborted = true;
    },
  },
});

export const selectProgress = createSelector(
  (state: RootState) => state.visualizer.completed,
  (state: RootState) => state.visualizer.total,
  (completed, total) => ({ completed, total })
);

export const selectCurrentItem = createSelector(
  (state: RootState) => state.visualizer.currentId,
  (state: RootState) => state.beastiary.entities,
  (currentId, entities) => entities[currentId]
);

export const { sessionAborted } = visualizerSlice.actions;

export const startSession =
  (onCompleted: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const count = selectAll(getState()).filter(
      (i) => !i.images || !i.images.length
    ).length;
    dispatch(visualizerSlice.actions.sessionStarted(count));
    dispatch(visualizeItem(onCompleted));
  };

const visualizeItem =
  (onCompleted: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const aborted = getState().visualizer.aborted;
    if (aborted) {
      console.debug("aborted");
      return onCompleted();
    }

    // get one
    const item = selectAll(getState()).find(
      (i) => !i.images || !i.images.length
    );
    if (!item) {
      console.debug("all visualized");
      return onCompleted();
    }

    try {
      dispatch(visualizerSlice.actions.itemStarted(item.id));
      const images = await generateImages(item.appearance);
      console.debug("images", images);
      dispatch(
        updated({
          id: item.id,
          changes: { images },
        })
      );

      await delay(100);
      dispatch(saveBeastiaryData());

      dispatch(visualizerSlice.actions.itemCompleted());
      await delay(100);
      dispatch(visualizeItem(onCompleted));
    } catch (e) {
      console.error(e);
      dispatch(visualizerSlice.actions.sessionAborted());
      return onCompleted();
    }
  };

export default visualizerSlice.reducer;
