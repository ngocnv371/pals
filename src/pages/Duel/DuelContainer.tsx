import { useAppSelector } from "../../store/hooks";
import { Board } from "./Board/Board";
import { Hand } from "./Hand/Hand";
import { FusionVisualizerContainer } from "./Fusion/FusionVisualizer";
import StageBanner from "./stages/StageBanner";
import { BattleVisualizerContainer } from "./Battle/BattleVisualizer";
import { LifeLabel } from "./stages/LifeLabel";
import EndTurnButton from "./stages/attacking/EndTurnButton";
import PlaceCardsButton from "./stages/drawing/PlaceCardsButton";
import { TheirHand } from "./Hand/TheirHand";
import QuitButton from "./stages/QuitButton";
import { selectStage } from "./v2/selectors";
import { Stage } from "./v2/model";

const DuelContainer: React.FC = () => {
  const stage = useAppSelector(selectStage);

  return (
    <div className={`duel-container ${stage}`}>
      <LifeLabel />
      <Board />
      <StageBanner />
      <FusionVisualizerContainer />

      {stage == Stage.PresentingHand && <Hand />}
      {stage == Stage.PresentingHand && <PlaceCardsButton />}
      {stage == Stage.PresentingBattleFormation && <EndTurnButton />}
    </div>
  );
};

export default DuelContainer;
