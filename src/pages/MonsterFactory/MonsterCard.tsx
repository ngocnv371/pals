import {
  IonCard,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { Monster } from "./model";
import "./MonsterCard.css";

const MonsterCard: React.FC<{ monster: Monster }> = ({ monster }) => {
  return (
    <IonCard className="monster-card">
      <IonImg src="/icons/question-mark-80.png" />
      <IonList>
        <IonListHeader>{monster.name}</IonListHeader>
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
    </IonCard>
  );
};

export default MonsterCard;
