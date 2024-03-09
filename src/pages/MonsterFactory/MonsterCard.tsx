import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { Monster } from "./model";
import "./MonsterCard.css";

const MonsterCard: React.FC<{ monster: Monster } & React.PropsWithChildren> = ({
  monster,
  children,
}) => {
  return (
    <IonCard className="monster-card">
      <IonImg src="/icons/question-mark-80.png" />
      <IonCardHeader>
        <IonCardTitle>{monster.name}</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonLabel>Class</IonLabel>
          <IonNote slot="end">{monster.class}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>Type</IonLabel>
          <IonNote slot="end">{monster.type}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>Nature</IonLabel>
          <IonNote slot="end">{monster.nature}</IonNote>
        </IonItem>
      </IonList>
      <IonCardContent>{monster.description}</IonCardContent>
      {children}
    </IonCard>
  );
};

export default MonsterCard;
