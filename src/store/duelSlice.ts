import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { DuelStage, Side } from "../pages/Deck/model";
import {
  changeStanceToDefensive,
  deploy,
  endBattle,
  fuseOne,
  generateSide,
  getBattle,
  prepareDeployment,
  refillReserves,
  selectDeploymentTarget,
  selectReserves,
  selectTargetForOffensive,
  selectUnitForOffensive,
} from "../pages/Deck/service";

interface State {
  their: Side;
  my: Side;
  stage: DuelStage;
}

const initialState: State = {
  their: generateSide(),
  my: generateSide(),
  stage: DuelStage.Start,
};

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {
    myCardsDrawed(state) {
      refillReserves(state.my);
      state.stage = DuelStage.MyDrawing;
    },
    theirCardsDrawed(state) {
      refillReserves(state.their);
      state.stage = DuelStage.TheirDrawing;
    },
    myReservesSelected(state, action: PayloadAction<number[]>) {
      if (state.stage !== DuelStage.MyDrawing) {
        return;
      }

      selectReserves(state.my, action.payload);
    },
    myPlacingStarted(state) {
      state.stage = DuelStage.MyPlacing;
    },
    myDeploymentTargetSelected(state, action: PayloadAction<number>) {
      if (state.stage !== DuelStage.MyPlacing) {
        return;
      }

      selectDeploymentTarget(state.my, action.payload);
      prepareDeployment(state.my);
      state.stage = DuelStage.MyFusion;
    },
    myPlaced(state) {
      if (state.stage !== DuelStage.MyFusion) {
        return;
      }
      deploy(state.my);
    },
    myFused(state) {
      if (state.stage !== DuelStage.MyFusion) {
        return;
      }

      fuseOne(state.my);
    },
    myAttackStarted(state) {
      state.stage = DuelStage.MyAttack;
    },
    myStanceChangedToDefensive(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      changeStanceToDefensive(state.my, action.payload.index);
    },
    myOffensiveCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectUnitForOffensive(state.my, action.payload.index);
      state.stage = DuelStage.MyTargetting;
    },
    myTargetCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectTargetForOffensive(state.my, action.payload.index);
    },
    myBattleStarted(state) {
      state.stage = DuelStage.MyBattle;
    },
    myBattleEnded(state) {
      endBattle(state.my, state.their);
    },
  },
});

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

export const selectMyAttack = createSelector(
  (state: RootState) => state.duel.my,
  (state: RootState) => state.duel.their,
  (my, their) => getBattle(my, their)
);

export const selectTheirAttack = createSelector(
  (state: RootState) => state.duel.my,
  (state: RootState) => state.duel.their,
  (my, their) => getBattle(their, my)
);

export const selectStage = (state: RootState) => state.duel.stage;

export const {
  myCardsDrawed,
  myReservesSelected,
  myDeploymentTargetSelected,
  myStanceChangedToDefensive,
  myOffensiveCardSelected,
  myTargetCardSelected,
  theirCardsDrawed,
  myPlacingStarted,
} = duelSlice.actions;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type SideSelector = (state: State) => Side;
function fuseAndPlace(
  selector: SideSelector,
  fuseAction: any,
  placeAction: any,
  attackAction: any
) {
  const fuseAllAndPlace =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      while (selector(getState().duel).deploymentPlan?.queue?.length! >= 2) {
        dispatch(fuseAction);
        console.debug("delay, wait for animation");
        await delay(4000);
      }
      console.debug("done fusing, now place");
      dispatch(placeAction);
      dispatch(attackAction);
    };
  return fuseAllAndPlace;
}

export const myFuseAndPlace = fuseAndPlace(
  (state) => state.my,
  duelSlice.actions.myFused(),
  duelSlice.actions.myPlaced(),
  duelSlice.actions.myAttackStarted()
);

function battle(
  selector: SideSelector,
  startAction: any,
  endAction: any,
  attackAction: any,
  doneAction: any
) {
  const fuseAllAndPlace =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      console.debug("attack!!");
      dispatch(startAction);
      await delay(4000);
      dispatch(endAction);
      if (selector(getState().duel).forward.some((d) => !d?.acted)) {
        dispatch(attackAction);
      } else {
        dispatch(doneAction);
      }
    };
  return fuseAllAndPlace;
}

export const myBattle = battle(
  (state) => state.my,
  duelSlice.actions.myBattleStarted(),
  duelSlice.actions.myBattleEnded(),
  duelSlice.actions.myAttackStarted(),
  duelSlice.actions.theirCardsDrawed()
);

export default duelSlice.reducer;
