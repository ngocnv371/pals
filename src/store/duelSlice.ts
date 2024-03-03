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

  fusion?: {
    card1: string;
    card2: string;
    result: string;
  };

  battle?: {
    card1: string;
    card2: string;
    /**
     * calculated outcome of the attack:
     *
     * 0        - tie: both units destroyed
     *
     * positive - win: offensive unit wins, the target unit is destroyed
     *
     * negative - win: offensive unit loose, the offensive unit is destroyed
     */
    result: number;
  };
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
    theirReservesSelected(state, action: PayloadAction<number[]>) {
      if (state.stage !== DuelStage.TheirDrawing) {
        return;
      }

      selectReserves(state.their, action.payload);
    },
    myPlacingStarted(state) {
      state.stage = DuelStage.MyPlacing;
    },
    theirPlacingStarted(state) {
      state.stage = DuelStage.TheirPlacing;
    },
    myDeploymentTargetSelected(state, action: PayloadAction<number>) {
      if (state.stage !== DuelStage.MyPlacing) {
        return;
      }

      selectDeploymentTarget(state.my, action.payload);
      prepareDeployment(state.my);
      state.stage = DuelStage.MyFusion;
    },
    theirDeploymentTargetSelected(state, action: PayloadAction<number>) {
      if (state.stage !== DuelStage.TheirPlacing) {
        return;
      }

      selectDeploymentTarget(state.their, action.payload);
      prepareDeployment(state.their);
      state.stage = DuelStage.TheirFusion;
    },
    myPlaced(state) {
      if (state.stage !== DuelStage.MyFusion) {
        return;
      }
      deploy(state.my);
    },
    theirPlaced(state) {
      if (state.stage !== DuelStage.TheirFusion) {
        return;
      }
      deploy(state.their);
    },
    myFused(state) {
      if (state.stage !== DuelStage.MyFusion) {
        return;
      }

      state.fusion = fuseOne(state.my);
    },
    theirFused(state) {
      if (state.stage !== DuelStage.TheirFusion) {
        return;
      }

      state.fusion = fuseOne(state.their);
    },
    fusionCompleted(state) {
      state.fusion = undefined;
    },
    myAttackStarted(state) {
      state.stage = DuelStage.MyAttack;
    },
    theirAttackStarted(state) {
      state.stage = DuelStage.TheirAttack;
    },
    myStanceChangedToDefensive(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      changeStanceToDefensive(state.my, action.payload.index);
    },
    theirStanceChangedToDefensive(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      changeStanceToDefensive(state.their, action.payload.index);
    },
    myOffensiveCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectUnitForOffensive(state.my, action.payload.index);
      state.stage = DuelStage.MyTargetting;
    },
    theirOffensiveCardSelected(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      selectUnitForOffensive(state.their, action.payload.index);
      state.stage = DuelStage.TheirTargetting;
    },
    myTargetCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectTargetForOffensive(state.my, action.payload.index);
    },
    theirTargetCardSelected(state, action: PayloadAction<{ index: number }>) {
      selectTargetForOffensive(state.their, action.payload.index);
    },
    myBattleStarted(state) {
      state.stage = DuelStage.MyBattle;
    },
    theirBattleStarted(state) {
      state.stage = DuelStage.TheirBattle;
    },
    myBattleEnded(state) {
      endBattle(state.my, state.their);
    },
    theirBattleEnded(state) {
      endBattle(state.their, state.their);
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
  fusionCompleted,
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

export const drawTheirCards =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(duelSlice.actions.theirCardsDrawed());
    // TODO: calculate optimal fusing
    await delay(500);
    dispatch(duelSlice.actions.theirReservesSelected([0]));
    await delay(1000);
    dispatch(duelSlice.actions.theirReservesSelected([0, 3]));
    await delay(1000);
    // TODO: select a target
    dispatch(duelSlice.actions.theirPlacingStarted());
    await delay(500);
    dispatch(duelSlice.actions.theirDeploymentTargetSelected(0));
    await delay(500);
    dispatch(theirFuseAndPlace());
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
  duelSlice.actions.myBattleEnded(),
  duelSlice.actions.myAttackStarted(),
  drawTheirCards()
);

export const theirBattle = battle(
  (state) => state.their,
  duelSlice.actions.theirBattleStarted(),
  duelSlice.actions.theirBattleEnded(),
  duelSlice.actions.theirAttackStarted(),
  myCardsDrawed()
);

export default duelSlice.reducer;
