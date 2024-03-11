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
import SelectAdapterButton from "../GPT/SelectAdapterButton";
import SetApiKeyButton from "../GPT/SetApiKeyButton";
import BatchCreateButton from "./BatchCreateButton";
import BatchFillCard from "./BatchFillCard";
import PromptWatcher from "./PromptWatcher";

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
            <SetApiKeyButton />
            <SelectAdapterButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="monster-container">
        <BatchFillCard />
        <PromptWatcher />
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
