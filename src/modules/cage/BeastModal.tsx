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
import { useBeast } from "./useBeast";

type Props = {
  id: string;
  isOpen: boolean;
  onDidDismiss?: () => void;
};
export default function BeastModal({ id, isOpen, onDidDismiss }: Props) {
  const beast = useBeast(id);

  if (!beast) {
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
          src={`/pals/${beast.image}`}
          style={{ maxWidth: 180, margin: "0 auto" }}
        />
        {beast.name != beast.name && <h3>Species: {beast.name}</h3>}
        <h2>
          Lv{beast.level} {beast.name}
        </h2>
        <CardTypes types={beast.types} full />
        <p>{beast.description}</p>
        <IonList>
          <IonItem>
            <IonLabel>Rarity</IonLabel>
            <IonLabel slot="end">{beast.rarity}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Attack</IonLabel>
            <IonLabel slot="end">{beast.attack}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Defense</IonLabel>
            <IonLabel slot="end">{beast.defense}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Price</IonLabel>
            <IonLabel slot="end">{beast.price}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}
