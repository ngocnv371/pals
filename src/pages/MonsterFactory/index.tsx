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
import { copy, refresh, save } from "ionicons/icons";
import "./styles.css";
import SettingsButton from "./SettingsButton";
import { useAppDispatch } from "../../store/hooks";
import { added, updated } from "./beastiarySlice";
import MonsterPrompt from "./MonsterPrompt";
import SmartFillButton from "./SmartFillButton";

const MonsterFactoryPage: React.FC = () => {
  const [monster, setMonster] = useState<Monster | null>(null);
  const dispatch = useAppDispatch();

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
              <SmartFillButton monster={monster!} />
            </MonsterCard>
          )}
          {Boolean(monster) && (
            <div>
              <MonsterPrompt monster={monster!} />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
