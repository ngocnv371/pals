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
} = internalServices;

const initialState = getInitialState();

export const slice = createSlice({
  name: "duel2",
  initialState,
  reducers: {
    started: start,
    cardsDrawed: drawCards,
    cardsForDeploymentSelected: selectCardsForDeployment,
    selectingCardsForDeploymentEnded: endSelectingCardsForDeployment,
    targetDeploymentPositionSelected: selectTargetDeploymentPosition,
    fused: fuse,
    deploymentSkipped: skipDeployment,
    unitSwitchedToDefensive: switchUnitToDefensive,
    unitForBattleSelected: selectUnitForBattle,
    targetUnitForBattleSelected: selectTargetUnitForBattle,
    battleEnded: endBattle,
    surrendered: surrender,
  },
});

export const internalEvents = slice.actions;

export default slice.reducer;
