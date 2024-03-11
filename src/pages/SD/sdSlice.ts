import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store/store";
import { loadData, saveData } from "./service";
import { SDState, providers } from "./model";

const initialState: SDState = {
  apiKey: "",
  url: "",
  provider: providers[0],
};

const sdSlice = createSlice({
  name: "sd",
  initialState,
  reducers: {
    keyChanged(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
    providerChanged(state, action: PayloadAction<string>) {
      state.provider = action.payload;
    },
    urlChanged(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export const saveSdData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().sd;
    saveData(state);
  };

export const loadSdData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const data: SDState = loadData();
      dispatch(sdSlice.actions.keyChanged(data.apiKey));
      dispatch(sdSlice.actions.providerChanged(data.provider));
      dispatch(sdSlice.actions.providerChanged(data.url));
    } catch (e) {
      console.error("failed to load sd data", e);
    }
  };

export const setProvider =
  (provider: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(sdSlice.actions.providerChanged(provider));
    dispatch(saveSdData());
  };

export const setApiKey =
  (apiKey: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(sdSlice.actions.keyChanged(apiKey));
    dispatch(saveSdData());
  };

export const setUrl =
  (url: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(sdSlice.actions.urlChanged(url));
    dispatch(saveSdData());
  };

export default sdSlice.reducer;
