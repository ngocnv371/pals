import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import "./Spot.css";

const Spot: React.FC = () => {
  return (
    <div className="spot">
      <IonIcon icon={addCircleOutline} color="primary" size="large" />
    </div>
  );
};

export default Spot;
