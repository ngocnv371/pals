import { DuelStage, selectStage } from "../../store/duelSlice";
import { useAppSelector } from "../../store/hooks";
import MyAttack from "./stages/MyAttack";
import MyDrawing from "./stages/MyDrawing";
import MyPlacing from "./stages/MyPlacing";
import TheirAttack from "./stages/TheirAttack";
import TheirDrawing from "./stages/TheirDrawing";
import TheirPlacing from "./stages/TheirPlacing";

const DuelContainer: React.FC = () => {
  const stage = useAppSelector(selectStage);

  return (
    <div className={`duel-container ${stage}`}>
      {stage == DuelStage.MyDrawing && <MyDrawing />}
      {stage == DuelStage.MyPlacing && <MyPlacing />}
      {stage == DuelStage.MyAttack && <MyAttack />}
      {stage == DuelStage.TheirDrawing && <TheirDrawing />}
      {stage == DuelStage.TheirPlacing && <TheirPlacing />}
      {stage == DuelStage.TheirAttack && <TheirAttack />}
    </div>
  );
};

export default DuelContainer;
