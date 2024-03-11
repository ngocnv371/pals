import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store/store";
import { loadData, saveData } from "./service";
import { GPTState, adapters } from "./model";

const initialState: GPTState = {
  apiKey: "",
  adapter: adapters[0],
};

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {
    keyChanged(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
    adapterChanged(state, action: PayloadAction<string>) {
      state.adapter = action.payload;
    },
  },
});

export const saveGptData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().gpt;
    saveData(state);
  };

export const loadGptData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const data: GPTState = loadData();
      dispatch(gptSlice.actions.keyChanged(data.apiKey));
      dispatch(gptSlice.actions.adapterChanged(data.adapter));
    } catch (e) {
      console.error("failed to load gpt data", e);
    }
  };

export const setAdapter =
  (adapter: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(gptSlice.actions.adapterChanged(adapter));
    dispatch(saveGptData());
  };

export const setApiKey =
  (apiKey: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(gptSlice.actions.keyChanged(apiKey));
    dispatch(saveGptData());
  };

export default gptSlice.reducer;
