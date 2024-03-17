import { IonButton, IonIcon } from "@ionic/react";
import { shield } from "ionicons/icons";
import { Stance } from "../../v2/model";
import "./StanceSwitcher.css";

interface StanceSwitcherProps {
  disabledAttack?: boolean;
  disabledDefense?: boolean;
  onClick?: (stance: Stance) => void;
}

const StanceSwitcher: React.FC<StanceSwitcherProps> = ({
  onClick,
  disabledAttack,
  disabledDefense,
}) => {
  return (
    <div className="stance-switcher">
      <div>
        <IonButton
          onClick={() => onClick && onClick(Stance.Offensive)}
          disabled={disabledAttack}
        >
          <IonIcon icon={"/icons/sword.svg"} />
        </IonButton>
      </div>
      <div>
        <IonButton
          onClick={() => onClick && onClick(Stance.Defensive)}
          disabled={disabledDefense}
        >
          <IonIcon icon={shield} />
        </IonButton>
      </div>
    </div>
  );
};

export default StanceSwitcher;
