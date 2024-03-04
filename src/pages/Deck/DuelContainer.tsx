import { useEffect } from "react";
import { myCardsDrawed, selectStage } from "./duelSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Board } from "./Board/Board";
import { Hand } from "./Hand/Hand";
import FusionVisualizer from "./Fusion/FusionVisualizer";
import StageBanner from "./stages/StageBanner";
import { BattleVisualizer } from "./Battle/BattleVisualizer";
import { LifeLabel } from "./stages/LifeLabel";
import EndTurnButton from "./stages/attacking/EndTurnButton";
import PlaceCardsButton from "./stages/drawing/PlaceCardsButton";
import { DuelStage } from "./model";
import { TheirHand } from "./Hand/TheirHand";
import FusionPreview from "./Fusion/FusionPreview";

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
      <LifeLabel />
      <Board />
      <StageBanner />
      <BattleVisualizer />
      <FusionVisualizer />
      {stage == DuelStage.MyDrawing && <FusionPreview />}

      {stage == DuelStage.MyDrawing && <Hand />}
      {stage == DuelStage.MyDrawing && <PlaceCardsButton />}

      {stage == DuelStage.MyAttack && <EndTurnButton />}
      {stage == DuelStage.TheirDrawing && <TheirHand />}
    </div>
  );
};

export default DuelContainer;
