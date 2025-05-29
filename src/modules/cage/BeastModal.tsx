import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import CardTypes from "../../components/Card/CardTypes";
import { useBeast } from "./useCage";
import { usePal } from "./useEgg";

type Props = {
  id: string;
  isOpen: boolean;
  onDidDismiss?: () => void;
};
export default function BeastModal({ id, isOpen, onDidDismiss }: Props) {
  const beast = useBeast(id);
  const pal = usePal(beast?.pal!);

  if (!beast) {
    return null;
  }

  if (!pal) {
    return null;
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
          <IonTitle>
            Lv{beast.level} {beast.name}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg
          src={`/pals/${pal.image}`}
          style={{ maxWidth: 180, margin: "0 auto" }}
        />
        {pal.name != beast.name && <h3>Species: {pal.name}</h3>}
        <h2>
          Lv{beast.level} {beast.name}
        </h2>
        <CardTypes types={pal.types} full />
        <p>{pal.description}</p>
        <IonList>
          <IonItem>
            <IonLabel>Rarity</IonLabel>
            <IonLabel slot="end">{pal.rarity}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Attack</IonLabel>
            <IonLabel slot="end">{pal.attack}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Defense</IonLabel>
            <IonLabel slot="end">{pal.defense}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Price</IonLabel>
            <IonLabel slot="end">{pal.price}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
