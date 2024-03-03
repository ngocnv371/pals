import { useEffect } from "react";
import { DuelStage, myCardsDrawed, selectStage } from "../../store/duelSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Board } from "./Board";
import { Hand } from "./Hand";
import FusionVisualizer from "./FusionVisualizer";
import StageBanner from "./StageBanner";
import { MyBattleVisualizer } from "./BattleVisualizer";
import { MyLifeLabel, TheirLifeLabel } from "./LifeLabel";
import EndTurnButton from "./EndTurnButton";

const DuelContainer: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const dispatch = useAppDispatch();

  // start duel
  useEffect(() => {
    if (stage === DuelStage.Start) {
      dispatch(myCardsDrawed());
    }
  }, [stage]);

  return (
    <div className={`duel-container ${stage}`}>
      <MyLifeLabel />
      <TheirLifeLabel />
      <Board />
      <StageBanner />
      {stage == DuelStage.MyDrawing && <Hand />}
      {stage == DuelStage.MyFusion && <FusionVisualizer />}
      {stage == DuelStage.MyBattle && <MyBattleVisualizer />}
      {stage == DuelStage.MyAttack && <EndTurnButton />}
    </div>
  );
};

export default DuelContainer;
