import { State, duelSlice } from "./duelSlice";
import { AppThunkAction } from "../../../store";
import { CardStance, Side } from "../model";
import {
  calculateBattleAnimationDuration,
  calculateFusionAnimationDuration,
  generateTheirDeck,
} from "../service";
import { delay } from "../utils/delay";
import { jake } from "./ai/jake";
import { breedPals } from "../../pals/service";

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

export const duelStarted: AppThunkAction = () => async (dispatch, getState) => {
  const state = getState();
  const myDeck = state.deck.ids.map((i) => state.deck.entities[i].cardId);
  const theirDeck = generateTheirDeck();
  dispatch(duelSlice.actions.started({ myDeck, theirDeck }));
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
    const {
      their: { life: theirLife },
      my: { life: myLife },
    } = getState().duel;
    if (myLife <= 0 || theirLife <= 0) {
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
