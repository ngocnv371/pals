import { AppDispatch, RootState } from "../../../../store/store";
import { Formation } from "../../model";
import { simulateBattle } from "../../service";
import { getPalMetadataById } from "../../../../data/palMetadata";
import { delay } from "../../utils/delay";
import { theirBattle, theirFuseAndPlace } from "../thunk-actions";
import { BattleAI } from "./battle-ai";

export const jake: BattleAI = (slice) => {
  const leadTheirOffensive =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      function inflateFormation(formation: Formation) {
        // sort by desc
        return formation
          .map((f, index) => ({ unit: f, index }))
          .filter((f) => Boolean(f.unit))
          .map((f) => ({
            ...getPalMetadataById(f.unit!.cardId),
            index: f.index,
            stance: f.unit!.stance,
            acted: f.unit!.acted,
          }))
          .sort((a, b) => b.content.baseAttack - a.content.baseAttack);
      }

      const theirInflatedUnits = inflateFormation(
        getState().duel.their.forward
      ).filter((f) => !f!.acted);

      if (!theirInflatedUnits.length) {
        dispatch(slice.actions.battleEnded());
        dispatch(slice.actions.myCardsDrawed());
        return;
      }

      const myInflatedUnits = inflateFormation(getState().duel.my.forward);

      const unit = theirInflatedUnits.pop()!;
      const target = myInflatedUnits.pop();
      if (!target) {
        // TODO: direct attack
        return;
      }

      const result = simulateBattle(unit.id, target.id, target.stance);
      if (result > 0) {
        // attack if winning
        console.debug("since we are winning, let us attack");
        dispatch(
          slice.actions.theirOffensiveCardSelected({ index: unit.index })
        );
        await delay(10);
        dispatch(
          slice.actions.theirTargetCardSelected({ index: target.index })
        );
        await delay(10);
        await dispatch(theirBattle());
        await delay(4000);
      } else {
        // if not, set to defensive
        dispatch(
          slice.actions.theirStanceChangedToDefensive({
            index: unit.index,
          })
        );
        await delay(1000);
      }

      dispatch(leadTheirOffensive());
    };

  const drawTheirCards =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      dispatch(slice.actions.theirCardsDrawed());
      // TODO: calculate optimal fusing
      await delay(500);
      dispatch(slice.actions.theirReservesSelected([0]));
      await delay(1000);
      dispatch(slice.actions.theirReservesSelected([0, 3]));
      await delay(1000);
      // TODO: select a target
      dispatch(slice.actions.theirPlacingStarted());
      await delay(500);
      dispatch(slice.actions.theirDeploymentTargetSelected(0));
      await delay(500);
      await dispatch(theirFuseAndPlace());
      // TODO: better attacks
      dispatch(leadTheirOffensive());
    };

  return {
    leadTheirOffensive,
    drawTheirCards,
  } as const;
};
