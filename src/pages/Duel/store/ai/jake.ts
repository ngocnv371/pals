import { DuelStage, Formation } from "../../model";
import {
  EvaluatedPlan,
  calculateBattleAnimationDuration,
  getDeploymentPlans,
  simulateBattle,
} from "../../service";
import { getPalMetadataById } from "../../../../data/palMetadata";
import { delay } from "../../utils/delay";
import { theirBattle, theirFuseAndPlace } from "../thunk-actions";
import { BattleAI } from "./battle-ai";
import { AppThunkAction } from "../../../../store";
import { breedById } from "../../../../data/palBreed";

export const jake: BattleAI = (slice) => {
  const leadTheirOffensive: AppThunkAction =
    () => async (dispatch, getState) => {
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

      async function considerTargetDramatically(target?: number) {
        dispatch(slice.actions.theirTargetCardConsidered({ index: 0 }));
        await delay(200);
        dispatch(slice.actions.theirTargetCardConsidered({ index: 1 }));
        await delay(200);
        dispatch(slice.actions.theirTargetCardConsidered({ index: 2 }));
        await delay(200);
        dispatch(slice.actions.theirTargetCardConsidered({ index: 3 }));
        await delay(200);
        dispatch(slice.actions.theirTargetCardConsidered({ index: 4 }));
        await delay(200);
        if (typeof target !== "undefined") {
          dispatch(slice.actions.theirTargetCardConsidered({ index: target }));
          await delay(200);
        }
      }

      if (getState().duel.stage !== DuelStage.TheirAttack) {
        console.warn("wrong stage");
        return;
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
        console.debug("wide open, direct attack");
        dispatch(
          slice.actions.theirOffensiveCardSelected({ index: unit.index })
        );
        await delay(1000);
        await considerTargetDramatically();
        dispatch(slice.actions.theirTargetCardSelected({ index: -1 }));
        await delay(100);
        await dispatch(theirBattle());
      } else if (simulateBattle(unit.id, target.id, target.stance) > 0) {
        // attack if winning
        console.debug("since we are winning, let us attack");
        dispatch(
          slice.actions.theirOffensiveCardSelected({ index: unit.index })
        );
        await delay(1000);
        await considerTargetDramatically(target.index);
        await delay(100);
        dispatch(
          slice.actions.theirTargetCardSelected({ index: target.index })
        );
        await delay(10);
        await dispatch(theirBattle());
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

  const drawTheirCards: AppThunkAction = () => async (dispatch, getState) => {
    dispatch(slice.actions.theirCardsDrawed());
    const side = getState().duel.their;
    await delay(500);

    console.time("calculate deployment plan");
    const plans = getDeploymentPlans(side);
    console.timeEnd("calculate deployment plan");
    const hasEmptyCell = side.forward.some((f) => !Boolean(f));
    const noReplacementPlans = plans.filter(
      (p) => !Boolean(side.forward[p.targetIndex])
    );
    console.debug("has empty?", hasEmptyCell, noReplacementPlans);
    let plan: EvaluatedPlan;
    if (hasEmptyCell && noReplacementPlans.length > 0) {
      plan = noReplacementPlans.reverse()[0];
    } else {
      plan = plans.reverse()[0];
    }

    console.debug(`best plan`, plan);
    const indices1 = [plan.indices[0]];
    const indices2 = plan.indices;
    dispatch(slice.actions.theirReservesSelected(indices1));
    await delay(1000);
    dispatch(slice.actions.theirReservesSelected(indices2));
    await delay(1000);

    dispatch(slice.actions.theirPlacingStarted());
    await delay(500);
    dispatch(slice.actions.theirDeploymentTargetSelected(plan.targetIndex));
    await delay(500);
    await dispatch(theirFuseAndPlace());

    dispatch(leadTheirOffensive());
  };

  return {
    leadTheirOffensive,
    drawTheirCards,
  } as const;
};
