import { IonIcon } from "@ionic/react";
import { caretDown } from "ionicons/icons";
import "./Spot.css";

const Spot: React.FC = () => {
  return (
    <div className="spot animate__animated animate__shakeY animate__repeat-2">
      <IonIcon icon={caretDown} color="primary" size="large" />
    </div>
  );
};

export default Spot;
