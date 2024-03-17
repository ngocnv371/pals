import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

export const selectStage = (state: RootState) => state.duel2.stage;
export const selectTurn = (state: RootState) => state.duel2.turn;
export const selectResult = (state: RootState) => state.duel2.result;
export const selectDungeon = (state: RootState) => state.duel2.dungeon;
export const selectSpotlightIndex = (state: RootState) =>
  state.duel2.spotlightIndex;
export const selectFusion = (state: RootState) => state.duel2.fusion;
export const selectBattle = (state: RootState) => state.duel2.battle;

export const selectGraveyard = createSelector(
  (state: RootState) => state.duel2.my,
  (state: RootState) => state.duel2.their,
  (state: RootState) => state.duel2.turn,
  (my, their, turn) => [my, their][turn % 2].graveyard
);
