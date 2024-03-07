import { AppThunkAction } from "../../../../store";
import { duelSlice } from "../duelSlice";

export interface BattleAI {
  (slice: typeof duelSlice): {
    leadTheirOffensive: AppThunkAction;
    drawTheirCards: AppThunkAction;
  };
}
