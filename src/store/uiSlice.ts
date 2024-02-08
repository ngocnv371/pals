import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UIState {
  activeBaseId: string;
}

const initialState: UIState = {
  activeBaseId: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveBaseId(state, action: PayloadAction<string>) {
      state.activeBaseId = action.payload;
    },
  },
});

export const { setActiveBaseId } = uiSlice.actions;

export const selectActiveBaseId = (state: RootState) => state.ui.activeBaseId;

export default uiSlice.reducer;
