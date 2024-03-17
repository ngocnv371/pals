import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  start,
  drawCards,
  endBattle,
  fuse,
  getInitialState,
  endSelectingCardsForDeployment,
  selectCardsForDeployment,
  selectTargetDeploymentPosition,
  selectTargetUnitForBattle,
  selectUnitForBattle,
  skipDeployment,
  surrender,
  switchUnitToDefensive,
} from "./service";
import { AppDispatch, RootState } from "../../../store";

const initialState = getInitialState();

export const slice = createSlice({
  name: "duel2",
  initialState,
  reducers: {
    start,
    drawCards,
    selectCardsForDeployment,
    endSelectingCardsForDeployment,
    selectTargetDeploymentPosition,
    fuse,
    skipDeployment,
    switchUnitToDefensive,
    selectUnitForBattle,
    selectTargetUnitForBattle,
    endBattle,
    surrender,
  },
});

export const actions = slice.actions;

export default slice.reducer;
