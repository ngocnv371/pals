import { AppDispatch, RootState } from "../../../../store";
import { duelSlice } from "../duelSlice";

export interface BattleAI {
  (slice: typeof duelSlice): {
    leadTheirOffensive: () => (
      dispatch: AppDispatch,
      getState: () => RootState
    ) => Promise<void>;
    drawTheirCards: () => (
      dispatch: AppDispatch,
      getState: () => RootState
    ) => Promise<void>;
  };
}
