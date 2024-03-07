import { AppThunkAction } from "../../../../store";
import { DuelSliceType } from "../duelSlice";

export interface BattleAI {
  (slice: DuelSliceType): {
    leadTheirOffensive: AppThunkAction;
    drawTheirCards: AppThunkAction;
  };
}
