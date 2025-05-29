import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useBeast } from "./useCage";
import { usePal } from "./useEgg";
import "./BeastCard.css";
import CardTypes from "../../components/Card/CardTypes";
import { useState } from "react";

type Props = {
  id: string;
};
export default function BeastCard({ id }: Props) {
  const [showModal, setShowModal] = useState(false);
  const beast = useBeast(id);
  const pal = usePal(beast?.pal!);

  if (!beast) {
    return null;
  }

  if (!pal) {
    return null;
  }

  return (
    <>
      <IonCard
        className="beast-card ion-no-margin"
        onClick={() => setShowModal(true)}
      >
        <IonImg src={`/pals/${pal.image}`}></IonImg>
        <p className="beast-name ion-no-margin ion-wrap ion-text-center">
          {beast.name}
        </p>
        <span className="beast-level">Lv{beast.level}</span>
        <CardTypes types={pal.types} />
      </IonCard>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
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
    </>
  );
}
