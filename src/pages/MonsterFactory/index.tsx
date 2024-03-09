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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Monster } from "./model";
import MonsterCard from "./MonsterCard";
import { generateMonster, generatePrompt } from "./service";
import { refresh, save } from "ionicons/icons";
import "./styles.css";
import SettingsButton from "./SettingsButton";
import { useAppDispatch } from "../../store/hooks";
import { added, updated } from "./beastiarySlice";

const MonsterFactoryPage: React.FC = () => {
  const [monster, setMonster] = useState<Monster | null>(null);
  const dispatch = useAppDispatch();
  const prompt = useMemo(
    () => (monster ? generatePrompt(monster) : ""),
    [monster]
  );

  // init
  useEffect(() => {
    setMonster(generateMonster());
  }, []);

  const handleSave = useCallback(() => {
    if (!monster) {
      console.error("no monster to save");
      return;
    }

    dispatch(added(monster));
  }, [monster]);

  const handleRegenerate = useCallback(() => {
    setMonster(generateMonster());
  }, [monster]);

  return (
    <IonPage className="monster-factory-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Monster Factory</IonTitle>
          <IonButtons slot="end">
            <SettingsButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          {Boolean(monster) && (
            <MonsterCard monster={monster!}>
              <IonButton fill="clear" onClick={handleSave}>
                <IonIcon slot="start" icon={save}></IonIcon>Save
              </IonButton>
              <IonButton fill="clear" onClick={handleRegenerate}>
                <IonIcon slot="start" icon={refresh}></IonIcon>
                Regenerate
              </IonButton>
            </MonsterCard>
          )}
          <pre>{prompt}</pre>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
