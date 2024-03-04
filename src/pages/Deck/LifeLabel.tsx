import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import "./LifeLabel.css";
import { heart } from "ionicons/icons";

const LifeLabel: React.FC<{ life: number; label: string }> = ({
  life,
  label,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{label}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonIcon icon={heart} color="danger" />
        {life}
      </IonCardContent>
    </IonCard>
  );
};

export const MyLifeLabel: React.FC = () => {
  const life = useAppSelector((state) => state.duel.my.life);

  return (
    <div className="my-life-label">
      <LifeLabel life={life} label="You" />
    </div>
  );
};

export const TheirLifeLabel: React.FC = () => {
  const life = useAppSelector((state) => state.duel.their.life);

  return (
    <div className="their-life-label">
      <LifeLabel life={life} label="Evil" />
    </div>
  );
};
