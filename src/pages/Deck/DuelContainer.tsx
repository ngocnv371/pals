import { useEffect } from "react";
import { myCardsDrawed, selectStage } from "../../store/duelSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Board } from "./Board";
import { Hand } from "./Hand";
import FusionVisualizer from "./FusionVisualizer";
import StageBanner from "./StageBanner";
import { BattleVisualizer } from "./BattleVisualizer";
import { MyLifeLabel, TheirLifeLabel } from "./LifeLabel";
import EndTurnButton from "./EndTurnButton";
import PlaceCardsButton from "./PlaceCardsButton";
import { DuelStage } from "./model";
import { TheirHand } from "./TheirDrawing/TheirHand";

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
      <BattleVisualizer />
      <FusionVisualizer />

      {stage == DuelStage.MyDrawing && <Hand />}
      {stage == DuelStage.MyDrawing && <PlaceCardsButton />}

      {stage == DuelStage.MyAttack && <EndTurnButton />}
      {stage == DuelStage.TheirDrawing && <TheirHand />}
    </div>
  );
};

export default DuelContainer;
