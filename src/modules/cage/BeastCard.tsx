import { IonCard, IonCardContent, IonImg } from "@ionic/react";
import { useBeast } from "./useCage";
import { usePal } from "./useEgg";
import "./BeastCard.css";
import CardTypes from "../../components/Card/CardTypes";

type Props = {
  id: string;
};
export default function BeastCard({ id }: Props) {
  const beast = useBeast(id);
  const pal = usePal(beast?.pal!);

  if (!beast) {
    return null;
  }

  if (!pal) {
    return null;
  }

  return (
    <IonCard className="beast-card ion-no-margin">
      <IonImg src={`/pals/${pal.image}`}></IonImg>
      <p className="beast-name ion-no-margin ion-wrap ion-text-center">
        {beast.name}
      </p>
      <span className="beast-level">Lv{beast.level}</span>
      <CardTypes types={pal.types} />
    </IonCard>
  );
}
