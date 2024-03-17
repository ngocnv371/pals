import { useAppSelector } from "../../../store/hooks";
import { Stage } from "../v2/model";
import { selectStage } from "../v2/selectors";
import "./StageBanner.css";

const StageBanner: React.FC = () => {
  const stage = useAppSelector(selectStage);

  return (
    <div className="stage-banner ion-padding">
      {stage == Stage.Drawing && <h1>Select card(s) to deploy</h1>}
    </div>
  );
};

export default StageBanner;
