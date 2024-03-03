import { selectStage } from "../../store/duelSlice";
import { useAppSelector } from "../../store/hooks";
import { DuelStage } from "./model";

const StageBanner: React.FC = () => {
  const stage = useAppSelector(selectStage);

  return (
    <div className="stage-banner">
      {stage == DuelStage.MyDrawing && <h1>Drawing</h1>}
      {stage == DuelStage.MyPlacing && <h1>Select placement</h1>}
      {stage == DuelStage.MyFusion && <h1>Fuuusion!!</h1>}
      {stage == DuelStage.MyAttack && <h1>Attack</h1>}
    </div>
  );
};

export default StageBanner;
