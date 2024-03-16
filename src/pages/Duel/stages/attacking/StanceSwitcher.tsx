import { IonButton, IonIcon } from "@ionic/react";
import { shield } from "ionicons/icons";
import { CardStance } from "../../model";
import "./StanceSwitcher.css";

interface StanceSwitcherProps {
  disabledAttack?: boolean;
  disabledDefense?: boolean;
  onClick?: (stance: CardStance) => void;
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
          onClick={() => onClick && onClick(CardStance.Offensive)}
          disabled={disabledAttack}
        >
          <IonIcon icon={"/icons/sword.svg"} />
        </IonButton>
      </div>
      <div>
        <IonButton
          onClick={() => onClick && onClick(CardStance.Defensive)}
          disabled={disabledDefense}
        >
          <IonIcon icon={shield} />
        </IonButton>
      </div>
    </div>
  );
};

export default StanceSwitcher;
