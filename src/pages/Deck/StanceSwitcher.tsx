import { IonButton, IonIcon } from "@ionic/react";
import { shield } from "ionicons/icons";
import { CardStance } from "./model";
import "./StanceSwitcher.css";

interface StanceSwitcherProps {
  onClick?: (stance: CardStance) => void;
}

const StanceSwitcher: React.FC<StanceSwitcherProps> = ({ onClick }) => {
  return (
    <div className="stance-switcher">
      <div>
        <IonButton onClick={() => onClick && onClick(CardStance.Offensive)}>
          <IonIcon icon={"/icons/sword.svg"} />
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
