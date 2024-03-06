import { selectStage } from "./duelSlice";
import { useAppSelector } from "../../store/hooks";
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
import QuitButton from "./stages/QuitButton";

const DuelContainer: React.FC = () => {
  const stage = useAppSelector(selectStage);

  return (
    <div className={`duel-container ${stage}`}>
      <LifeLabel />
      <Board />
      <StageBanner />
      <BattleVisualizer />
      <FusionVisualizer />

      {stage !== DuelStage.End && <QuitButton />}
      {stage == DuelStage.MyDrawing && <FusionPreview />}

      {stage == DuelStage.MyDrawing && <Hand />}
      {stage == DuelStage.MyDrawing && <PlaceCardsButton />}

      {stage == DuelStage.MyAttack && <EndTurnButton />}
      {stage == DuelStage.TheirDrawing && <TheirHand />}
    </div>
  );
};

export default DuelContainer;
