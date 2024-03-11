import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Monster, classes } from "./model";
import { AppDispatch, AppThunkAction, RootState } from "../../store";
import { saveAs } from "file-saver";
import { extractInfo, generateDetail, generateMonsters } from "./service";
import { delay } from "../Duel/utils/delay";
import { getGpt } from "../GPT/service";
import { saveBeastiaryData, selectAll, updated } from "./beastiarySlice";

const initialState = {
  shouldStop: true,
  currentId: "",
};

const factorySlice = createSlice({
  name: "factory",
  initialState,
  reducers: {
    shouldStopChanged(state, action: PayloadAction<boolean>) {
      state.shouldStop = action.payload;
    },
    currentIdChanged(state, action: PayloadAction<string>) {
      state.currentId = action.payload;
    },
  },
});

export const { shouldStopChanged } = factorySlice.actions;

export const batchFill =
  (onDone: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().factory;
    if (state.shouldStop) {
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

    dispatch(factorySlice.actions.currentIdChanged(item.id));
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

    await delay(100);
    dispatch(saveBeastiaryData());

    await delay(100);
    dispatch(batchFill(onDone));
  };

export default factorySlice.reducer;
