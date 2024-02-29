import { DuelStage, selectStage } from "../../store/duelSlice";
import { useAppSelector } from "../../store/hooks";
import { Board } from "./Board";
import { Hand } from "./Hand";
const DuelContainer: React.FC = () => {
  const stage = useAppSelector(selectStage);

  return (
    <div className={`duel-container ${stage}`}>
      <Board />
      {stage == DuelStage.MyDrawing && <Hand />}
    </div>
  );
};

export default DuelContainer;
