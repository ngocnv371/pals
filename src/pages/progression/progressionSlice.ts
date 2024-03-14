import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  level: 1,
};

const progressionSlice = createSlice({
  name: "progression",
  initialState,
  reducers: {
    levelChanged(state, action: PayloadAction<number>) {
      state.level = action.payload;
    },
  },
});

export const { levelChanged } = progressionSlice.actions;

export const selectLevel = (state: RootState) => state.progression.level;

export default progressionSlice.reducer;
