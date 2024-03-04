import { IonIcon, IonLabel } from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import "./LifeLabel.css";
import { heart } from "ionicons/icons";

const LifeLabel: React.FC<{ life: number }> = ({ life }) => {
  return (
    <IonLabel className="life-label">
      <IonIcon icon={heart} color="danger" /> {life}
    </IonLabel>
  );
};

export const MyLifeLabel: React.FC = () => {
  const life = useAppSelector((state) => state.duel.my.life);

  return (
    <div className="my-life-label">
      <LifeLabel life={life} />
    </div>
  );
};

export const TheirLifeLabel: React.FC = () => {
  const life = useAppSelector((state) => state.duel.their.life);

  return (
    <div className="their-life-label">
      <LifeLabel life={life} />
    </div>
  );
};
