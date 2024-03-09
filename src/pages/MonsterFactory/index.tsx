import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Monster } from "./model";
import MonsterCard from "./MonsterCard";
import { generateMonster } from "./service";
import SettingsButton from "./SettingsButton";

const MonsterFactoryPage: React.FC = () => {
  const [monster, setMonster] = useState<Monster | null>(null);

  function handleGenerate() {
    setMonster(generateMonster());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Monster Factory</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleGenerate}>Generate</IonButton>
            <SettingsButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {Boolean(monster) && <MonsterCard monster={monster!} />}
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
