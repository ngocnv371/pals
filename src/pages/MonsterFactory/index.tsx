import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles.css";
import BatchCreateButton from "./BatchCreateButton";
import BatchFillCard from "./BatchFillCard";
import PromptWatcher from "./PromptWatcher";
import GPTConfigCard from "../GPT/GPTConfigCard";
import SDConfigCard from "../SD/SDConfigCard";

const MonsterFactoryPage: React.FC = () => {
  return (
    <IonPage className="monster-factory-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Monster Factory</IonTitle>
          <IonButtons slot="end">
            <BatchCreateButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="monster-container">
        <GPTConfigCard />
        <SDConfigCard />
        <BatchFillCard />
        <PromptWatcher />
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
