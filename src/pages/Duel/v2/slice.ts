import { createSlice } from "@reduxjs/toolkit";
import { internalServices } from "./service";
const {
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
  endFusion,
} = internalServices;

const initialState = getInitialState();

export const slice = createSlice({
  name: "duel2",
  initialState,
  reducers: {
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
    endFusion,
  },
});

export const internalEvents = slice.actions;

export default slice.reducer;
