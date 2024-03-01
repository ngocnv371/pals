import { IonButton, IonIcon } from "@ionic/react";
import { eyedrop, rocket, shield } from "ionicons/icons";
import { CardStance } from "../../store/duelSlice";
import "./StanceSwitcher.css";

interface StanceSwitcherProps {
  onClick?: (stance: CardStance) => void;
}

const StanceSwitcher: React.FC<StanceSwitcherProps> = ({ onClick }) => {
  return (
    <div className="stance-switcher">
      <div>
        <IonButton onClick={() => onClick && onClick(CardStance.Offensive)}>
          <IonIcon icon={rocket} />
        </IonButton>
      </div>
      <div>
        <IonButton onClick={() => onClick && onClick(CardStance.Defensive)}>
          <IonIcon icon={shield} />
        </IonButton>
      </div>
    </div>
  );
};

export default StanceSwitcher;
