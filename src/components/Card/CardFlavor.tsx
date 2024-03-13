import { useMemo } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import { shield } from "ionicons/icons";
import "./CardFlavor.css";
import { getPalById } from "../../pages/pals/service";
import CardTypes from "./CardTypes";

const CardFlavor: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useMemo(() => getPalById(cardId), [cardId]);
  if (!card) {
    return null;
  }

  return (
    <>
      <IonCard className="card-flavor ion-no-padding ion-no-margin flex">
        <IonImg src={`/pals/${card.image}`}></IonImg>
        <div>
          <IonCardHeader>
            <IonCardTitle>{card.name}</IonCardTitle>
          </IonCardHeader>
          <div className="ion-padding-start">
            <CardTypes types={card.types} full />
          </div>
          <IonCardContent>{card.description}</IonCardContent>
        </div>
      </IonCard>
      <IonList>
        <IonItem>
          <IonIcon icon="/icons/sword.svg" slot="start"></IonIcon>
          <IonLabel>Attack</IonLabel>
          <IonNote slot="end">{card.attack}</IonNote>
        </IonItem>
        <IonItem>
          <IonIcon icon={shield} slot="start"></IonIcon>
          <IonLabel>Defense</IonLabel>
          <IonNote slot="end">{card.defense}</IonNote>
        </IonItem>
      </IonList>
    </>
  );
};

export default CardFlavor;
