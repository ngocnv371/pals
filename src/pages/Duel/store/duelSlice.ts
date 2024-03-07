import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardStance, DuelStage, Side } from "../model";
import {
  changeStanceToDefensive,
  deploy,
  endBattle,
  fuseOne,
  initSide,
  prepareDeployment,
  refillReserves,
  resetAction,
  selectDeploymentTarget,
  selectReserves,
  selectTargetForOffensive,
  selectUnitForOffensive,
} from "../service";

export interface State {
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
    card2Stance: CardStance;
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
  their: initSide(),
  my: initSide(),
  stage: DuelStage.Start,
};

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {
    started(
      state,
      action: PayloadAction<{ myDeck: string[]; theirDeck: string[] }>
    ) {
      state.my = initSide();
      state.my.deck = action.payload.myDeck;
      state.their = initSide();
      state.their.deck = action.payload.theirDeck;
      state.stage = DuelStage.Start;
    },
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
      resetAction(state.my);
    },
    theirFused(state) {
      if (state.stage !== DuelStage.TheirFusion) {
        return;
      }

      state.fusion = fuseOne(state.their);
      resetAction(state.their);
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
      state.battle = endBattle(state.my, state.their);
    },
    theirBattleStarted(state) {
      state.stage = DuelStage.TheirBattle;
      state.battle = endBattle(state.their, state.my);
    },
    battleEnded(state) {
      state.battle = undefined;
    },
    duelEnded(state) {
      state.stage = DuelStage.Start;
      state.my = initSide();
      state.their = initSide();
    },
  },
});

export const {
  myCardsDrawed,
  myReservesSelected,
  myDeploymentTargetSelected,
  myStanceChangedToDefensive,
  myOffensiveCardSelected,
  myTargetCardSelected,
  theirCardsDrawed,
  myPlacingStarted,
  duelEnded,
} = duelSlice.actions;

export default duelSlice.reducer;
