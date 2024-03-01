import { useEffect } from "react";
import { DuelStage, myCardsDrawed, selectStage } from "../../store/duelSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Board } from "./Board";
import { Hand } from "./Hand";
import FusionVisualizer from "./FusionVisualizer";
import StageBanner from "./StageBanner";
import { MyBattleVisualizer } from "./BattleVisualizer";

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
      <Board />
      <StageBanner />
      {stage == DuelStage.MyDrawing && <Hand />}
      {stage == DuelStage.MyFusion && <FusionVisualizer />}
      {stage == DuelStage.MyBattle && <MyBattleVisualizer />}
    </div>
  );
};

export default DuelContainer;
