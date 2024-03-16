import { createSlice } from "@reduxjs/toolkit";
import * as service from "./service";
import { AppDispatch, RootState } from "../../../store";

const initialState = service.getInitialState();

const slice = createSlice({
  name: "duel2",
  initialState,
  reducers: {},
});

export const selectUnitsForDeployment =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const endDrawingStage =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const selectDeploymentTarget =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const changeUnitStance =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const selectUnitForBattle =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const selectTargetUnit =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const endBattleStage =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const surrender =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export default slice.reducer;
