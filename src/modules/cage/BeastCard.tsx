import { IonCard, IonImg } from "@ionic/react";
import "./BeastCard.css";
import CardTypes from "../../components/Card/CardTypes";
import { useBeast } from "./useBeast";

type Props = {
  id: string;
  onClick?: () => void;
  className?: string;
};
export default function BeastCard({ id, onClick, className }: Props) {
  const beast = useBeast(id);

  if (!beast) {
    return null;
  }

  return (
    <IonCard className={`beast-card ${className || ""}`} onClick={onClick}>
      <IonImg src={`/pals/${beast.image}`}></IonImg>
      <p className="beast-name ion-no-margin ion-wrap ion-text-center">
        {beast.name}
      </p>
      <span className="beast-level">Lv{beast.level}</span>
      <CardTypes types={beast.types} />
    </IonCard>
  );
}
