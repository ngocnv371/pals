import { State, duelSlice } from "./duelSlice";
import { AppDispatch, RootState } from "../../../store";
import { Side } from "../model";
import { generateTheirDeck } from "../service";
import { delay } from "../utils/delay";
import { jake } from "./ai/jake";

export type SideSelector = (state: State) => Side;
function fuseAndPlace(
  selector: SideSelector,
  fuseAction: any,
  placeAction: any,
  attackAction: any
) {
  return () => async (dispatch: AppDispatch, getState: () => RootState) => {
    while (selector(getState().duel).deploymentPlan?.queue?.length! >= 2) {
      dispatch(fuseAction);
      console.debug("delay, wait for animation");
      await delay(4000);
      dispatch(duelSlice.actions.fusionCompleted());
      await delay(10);
    }
    console.debug("done fusing, now place");
    dispatch(placeAction);
    dispatch(attackAction);
  };
}

export const duelStarted =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const myDeck = state.deck.ids.map((i) => state.deck.entities[i].type);
    const theirDeck = generateTheirDeck();
    dispatch(duelSlice.actions.started({ myDeck, theirDeck }));
    dispatch(duelSlice.actions.myCardsDrawed());
  };

export const myFuseAndPlace = fuseAndPlace(
  (state) => state.my,
  duelSlice.actions.myFused(),
  duelSlice.actions.myPlaced(),
  duelSlice.actions.myAttackStarted()
);

export const theirFuseAndPlace = fuseAndPlace(
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
) {
  return () => async (dispatch: AppDispatch, getState: () => RootState) => {
    console.debug("attack!!");
    dispatch(startAction);
    await delay(4000);
    dispatch(endAction);
    await delay(50);
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
