import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardStance, DuelStage, Fusion, Side, DuelResult } from "../model";
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
import { getConfig } from "../../config/service";

export interface State {
  their: Side;
  my: Side;
  stage: DuelStage;

  fusion?: Fusion;

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

  /**
   * indicate which target is being considered by the AI
   */
  consideredTargetIndex?: number;
  /**
   * result of the duel
   */
  result: DuelResult;
  dungeon?: string;
}

const initialState: State = {
  their: initSide(1),
  my: initSide(1),
  stage: DuelStage.Start,
  result: "unresolved",
};

export const duelSlice = createSlice({
  name: "duel",
  initialState,
  reducers: {
    started(
      state,
      action: PayloadAction<{
        my: Pick<Side, "deck" | "level">;
        their: Pick<Side, "deck" | "level">;
        dungeon?: string;
      }>
    ) {
      state.my = initSide(action.payload.my.level);
      state.my.deck = action.payload.my.deck;

      state.their = initSide(action.payload.their.level);
      state.their.deck = action.payload.their.deck;

      state.stage = DuelStage.Start;
      state.result = "unresolved";
      state.dungeon = action.payload.dungeon;
    },
    myCardsDrawed(state) {
      refillReserves(state.my, getConfig().duel.hand.size);
      state.stage = DuelStage.MyDrawing;
      resetAction(state.my);
    },
    theirCardsDrawed(state) {
      refillReserves(state.their, getConfig().duel.hand.size);
      state.stage = DuelStage.TheirDrawing;
      resetAction(state.their);
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
      if (!state.my.deploymentPlan?.selectedReservesIndices.length) {
        state.stage = DuelStage.MyAttack;
      } else {
        state.stage = DuelStage.MyPlacing;
      }
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
    theirTargetCardConsidered(state, action: PayloadAction<{ index: number }>) {
      state.consideredTargetIndex = action.payload.index;
    },
    myBattleStarted(state) {
      state.stage = DuelStage.MyBattle;
      state.battle = endBattle(state.my, state.their);
    },
    theirBattleStarted(state) {
      state.stage = DuelStage.TheirBattle;
      state.battle = endBattle(state.their, state.my);
      state.consideredTargetIndex = undefined;
    },
    battleEnded(state) {
      state.battle = undefined;
    },
    duelEnded(state) {
      if (state.my.life <= 0) {
        state.result = "loose";
      } else if (state.their.life <= 0) {
        state.result = "win";
      } else {
        state.result = "tie";
      }

      state.stage = DuelStage.End;
    },
  },
});

export type DuelSliceType = typeof duelSlice;

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
