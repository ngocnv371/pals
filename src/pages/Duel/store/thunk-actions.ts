import { State, duelSlice } from "./duelSlice";
import { AppDispatch, AppThunkAction, RootState } from "../../../store";
import { CardStance, Side } from "../model";
import {
  calculateBattleAnimationDuration,
  calculateFusionAnimationDuration,
  generateTheirDeck,
  getDeckSize,
  getReward,
  getGameResult,
} from "../service";
import { delay } from "../utils/delay";
import { jake } from "./ai/jake";
import { breedPals } from "../../pals/service";
import { Dungeon } from "../../Dungeons/model";
import { getDungeon } from "../../Dungeons/service";
import { getConfig } from "../../config/service";
import { selectLevel } from "../../progression/progressionSlice";

type SideSelector = (state: State) => Side;

function fuseAllThenPlace(
  selector: SideSelector,
  fuseAction: any,
  placeAction: any,
  attackAction: any
): AppThunkAction {
  return () => async (dispatch, getState) => {
    while (selector(getState().duel).deploymentPlan?.queue?.length! >= 2) {
      const [card1, card2] = selector(getState().duel).deploymentPlan?.queue!;
      const result = breedPals(card1, card2);
      dispatch(fuseAction);
      console.debug("delay, wait for animation");
      const duration = calculateFusionAnimationDuration({
        card1,
        card2,
        result: result || "",
      });
      await delay(duration);
      dispatch(duelSlice.actions.fusionCompleted());
      await delay(10);
    }
    console.debug("done fusing, now place");
    dispatch(placeAction);
    await delay(10);
    dispatch(attackAction);
  };
}

export const dungeonStarted =
  (dungeon: Dungeon) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const myLevel = selectLevel(state);
    const myDeck = state.deck.ids
      .map((i) => state.deck.entities[i].cardId)
      .splice(0, getDeckSize(myLevel));
    // 2x wilds + 1x bosses, sorted randomly
    const mobs = dungeon.wilds
      .concat(dungeon.wilds)
      .concat(dungeon.bosses)
      .sort(Math.random);
    const theirDeck = mobs.splice(0, getDeckSize(dungeon.level));
    dispatch(
      duelSlice.actions.started({
        my: { level: myLevel, deck: myDeck },
        their: { level: dungeon.level, deck: theirDeck },
        dungeon: dungeon.type,
      })
    );
    dispatch(duelSlice.actions.myCardsDrawed());
  };

export const getDuelReward =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const their = state.duel.their;
    return getReward(their);
  };

export const duelStarted: AppThunkAction = () => async (dispatch, getState) => {
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
  dispatch(
    duelSlice.actions.started({
      my: { level: myLevel, deck: myDeck },
      their: { level: myLevel, deck: theirDeck },
    })
  );
  dispatch(duelSlice.actions.myCardsDrawed());
};

export const myFuseAndPlace = fuseAllThenPlace(
  (state) => state.my,
  duelSlice.actions.myFused(),
  duelSlice.actions.myPlaced(),
  duelSlice.actions.myAttackStarted()
);

export const theirFuseAndPlace = fuseAllThenPlace(
  (state) => state.their,
  duelSlice.actions.theirFused(),
  duelSlice.actions.theirPlaced(),
  duelSlice.actions.theirAttackStarted()
);

export const { leadTheirOffensive, drawTheirCards } = jake(duelSlice);

function battle(
  selector: SideSelector,
  startAction: any,
  endAction: any,
  attackAction: any,
  doneAction: any
): AppThunkAction {
  return () => async (dispatch, getState) => {
    if (getState().duel.turn == 1) {
      console.debug("can not attack on first turn");
      dispatch(doneAction);
      return;
    }

    console.debug("attack!!");
    dispatch(startAction);
    await delay(10);
    const battle = getState().duel.battle;
    if (!battle) {
      console.error("battle not available");
      return;
    }

    const duration = calculateBattleAnimationDuration(
      battle.result,
      battle.card2Stance == CardStance.Defensive
    );
    await delay(duration);
    dispatch(endAction);
    await delay(50);

    // check endgame
    const { their, my } = getState().duel;
    const isOver = getGameResult(my, their) !== "unresolved";
    if (isOver) {
      console.debug(`game over dude`);
      dispatch(duelSlice.actions.duelEnded());
      return;
    }

    // next
    if (selector(getState().duel).forward.some((d) => !d?.acted)) {
      dispatch(attackAction);
    } else {
      dispatch(doneAction);
    }
  };
}

export const myBattle = battle(
  (state) => state.my,
  duelSlice.actions.myBattleStarted(),
  duelSlice.actions.battleEnded(),
  duelSlice.actions.myAttackStarted(),
  drawTheirCards()
);

export const theirBattle = battle(
  (state) => state.their,
  duelSlice.actions.theirBattleStarted(),
  duelSlice.actions.battleEnded(),
  duelSlice.actions.theirAttackStarted(),
  duelSlice.actions.myCardsDrawed()
);
