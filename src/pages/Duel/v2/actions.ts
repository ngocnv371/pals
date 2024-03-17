import { AppDispatch, RootState } from "../../../store";
import { Dungeon } from "../../Dungeons/model";
import { selectLevel } from "../../progression/progressionSlice";
import { internalServices } from "./service";
import { internalEvents } from "./slice";

export const startRandom =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const myLevel = selectLevel(state);
    const myCards = state.deck.ids.map((i) => state.deck.entities[i].cardId);
    const myDeck = myCards
      .slice()
      .sort(Math.random)
      .splice(0, internalServices.getDeckSize(myLevel));

    const theirDeck = myCards
      .slice()
      .sort(Math.random)
      .splice(0, internalServices.getDeckSize(myLevel));
    // TODO: fix life
    dispatch(
      internalEvents.started({
        my: { level: myLevel, deck: myDeck, life: 50 },
        their: { level: myLevel, deck: theirDeck, life: 50 },
      })
    );
    dispatch(internalEvents.cardsDrawed());
  };

export const startDungeon =
  (dungeon: Dungeon) => (dispatch: AppDispatch, getState: () => RootState) => {
    // dispatch(actions.start());
  };

export const selectTargetDeploymentPosition =
  (index: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(internalEvents.targetDeploymentPositionSelected({ index }));
  };

export const selectCardsForDeployment =
  (indices: number[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(internalEvents.cardsForDeploymentSelected({ indices }));
  };

export const switchUnitToDefensive =
  (index: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(internalEvents.unitSwitchedToDefensive({ index }));
  };

export const selectUnitForBattle =
  (index: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(internalEvents.unitForBattleSelected({ index }));
  };

export const endSelectingCardsForDeployment =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(internalEvents.selectingCardsForDeploymentEnded());
  };
