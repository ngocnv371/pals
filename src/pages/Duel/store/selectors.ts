import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { DuelStage } from "../model";

export const selectIsMyTurn = (state: RootState) =>
  [
    DuelStage.MyDrawing,
    DuelStage.MyPlacing,
    DuelStage.MyFusion,
    DuelStage.MyAttack,
    DuelStage.MyTargetting,
    DuelStage.MyBattle,
  ].includes(state.duel.stage);

export const selectTheirHand = (state: RootState) => state.duel.their.reserves;

export const selectMyHand = (state: RootState) => state.duel.my.reserves;

export const selectTheirDeployed = (state: RootState) =>
  state.duel.their.forward;

export const selectMyDeployed = (state: RootState) => state.duel.my.forward;

export const selectTheirSupports = (state: RootState) =>
  state.duel.their.support;

export const selectMySupports = (state: RootState) => state.duel.my.support;

export const selectSelectedReservesIndices = (state: RootState) =>
  state.duel.my.deploymentPlan?.selectedReservesIndices;

export const selectResult = (state: RootState) => state.duel.result;

export const selectMyFusionQueue = createSelector(
  (state: RootState) => state.duel.my.deploymentPlan?.selectedReservesIndices,
  (state: RootState) => state.duel.my.reserves,
  (indices, reserves) => indices?.map((i) => reserves[i])
);

export const selectStage = (state: RootState) => state.duel.stage;

export const selectTurn = (state: RootState) => state.duel.turn;
