import { AppDispatch, RootState } from "../../../store";
import { Dungeon } from "../../Dungeons/model";
import { selectLevel } from "../../progression/progressionSlice";
import { getDeckSize } from "./service";
import { actions } from "./slice";

export const startRandom =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const myLevel = selectLevel(state);
    const myCards = state.deck.ids.map((i) => state.deck.entities[i].cardId);
    const myDeck = myCards
      .slice()
      .sort(Math.random)
      .splice(0, getDeckSize(myLevel));

    const theirDeck = myCards
      .slice()
      .sort(Math.random)
      .splice(0, getDeckSize(myLevel));
    // TODO: fix life
    dispatch(
      actions.start({
        my: { level: myLevel, deck: myDeck, life: 50 },
        their: { level: myLevel, deck: theirDeck, life: 50 },
      })
    );
    dispatch(actions.drawCards());
  };

export const startDungeon =
  (dungeon: Dungeon) => (dispatch: AppDispatch, getState: () => RootState) => {
    // dispatch(actions.start());
  };

export const selectTargetDeploymentPosition =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};

export const selectTargetForDeployment =
  () => (dispatch: AppDispatch, getState: () => RootState) => {};
