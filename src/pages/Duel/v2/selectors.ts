import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

export const selectStage = (state: RootState) => state.duel2.stage;
export const selectTurn = (state: RootState) => state.duel2.turn;
export const selectIsMyTurn = (state: RootState) => state.duel2.turn % 2 == 0;
export const selectResult = (state: RootState) => state.duel2.result;
export const selectDungeon = (state: RootState) => state.duel2.dungeon;
export const selectSpotlightIndex = (state: RootState) =>
  state.duel2.spotlightIndex;
export const selectFusion = (state: RootState) => state.duel2.fusion;
export const selectBattle = (state: RootState) => state.duel2.battle;

export const selectMyLife = (state: RootState) => state.duel2.my.life;
export const selectTheirLife = (state: RootState) => state.duel2.their.life;

export const selectMyHand = (state: RootState) => state.duel2.my.hand;
export const selectTheirHand = (state: RootState) => state.duel2.their.hand;

export const selectMyDeployed = (state: RootState) => state.duel2.my.deployed;
export const selectTheirDeployed = (state: RootState) =>
  state.duel2.their.deployed;

export const selectMySupports = (state: RootState) => state.duel2.my.supports;
export const selectTheirSupports = (state: RootState) =>
  state.duel2.their.supports;

export const selectMyHandSelectedIndices = (state: RootState) =>
  state.duel2.my.deploymentPlan?.handIndices;
export const selectTheirHandSelectedIndices = (state: RootState) =>
  state.duel2.their.deploymentPlan?.handIndices;

export const selectGraveyard = createSelector(
  (state: RootState) => state.duel2.my,
  (state: RootState) => state.duel2.their,
  (state: RootState) => state.duel2.turn,
  (my, their, turn) => [my, their][turn % 2].graveyard
);
