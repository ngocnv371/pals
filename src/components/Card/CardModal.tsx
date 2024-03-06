import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
} from "@ionic/react";
import { useEffect, useMemo, useRef } from "react";
import { getPalMetadataById } from "../../data/palMetadata";
import "./CardModal.css";
import { shield } from "ionicons/icons";

interface CardModalProps {
  cardId: string;
  onDismiss?: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ cardId, onDismiss }) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const card = useMemo(() => getPalMetadataById(cardId), [cardId]);

  // on load card info
  useEffect(() => {
    modal.current?.present();
  }, [card]);

  if (!cardId || !card) {
    return null;
  }

  return (
    <IonModal ref={modal} onDidDismiss={onDismiss} className="card-modal">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              Close
            </IonButton>
          </IonButtons>
          <IonTitle>{card.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="info ion-no-padding ion-no-margin">
          <IonImg src={`/pals/${card.content.image}`}></IonImg>
          <IonCardContent>{card.content.description}</IonCardContent>
        </IonCard>
        <IonList>
          <IonItem>
            <IonIcon icon="/icons/sword.svg" slot="start"></IonIcon>
            <IonLabel>Attack</IonLabel>
            <IonNote slot="end">{card.content.baseAttack}</IonNote>
          </IonItem>
          <IonItem>
            <IonIcon icon={shield} slot="start"></IonIcon>
            <IonLabel>Defense</IonLabel>
            <IonNote slot="end">{card.content.defense}</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CardModal;
