import { useMemo } from "react";
import { getPalMetadataById } from "../../data/palMetadata";
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
  IonText,
} from "@ionic/react";
import { shield } from "ionicons/icons";
import "./CardFlavor.css";

const CardFlavor: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useMemo(() => getPalMetadataById(cardId), [cardId]);
  if (!card) {
    return null;
  }

  return (
    <>
      <IonCard className="card-flavor ion-no-padding ion-no-margin flex">
        <IonImg src={`/pals/${card.content.image}`}></IonImg>
        <div>
          <IonCardHeader>
            <IonCardTitle>
              {card.title}
              {" - "}
              <IonText color="secondary">{card.content.type}</IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{card.content.description}</IonCardContent>
        </div>
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
    </>
  );
};

export default CardFlavor;
