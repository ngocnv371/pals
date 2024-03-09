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
import { generateMonster } from "./service";
import { copy, refresh, save } from "ionicons/icons";
import "./styles.css";
import SettingsButton from "./SettingsButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { added, selectById, updated } from "./beastiarySlice";
import MonsterPrompt from "./MonsterPrompt";
import SmartFillButton from "./SmartFillButton";

const MonsterFactoryPage: React.FC = () => {
  const [id, setId] = useState("");
  const dispatch = useAppDispatch();
  const monster = useAppSelector((state) => selectById(state, id));

  function createOne() {
    const m = generateMonster();
    dispatch(added(m));
    setId(m.id);
  }

  // init
  useEffect(() => {
    createOne();
  }, []);

  const handleSave = useCallback(() => {
    if (!monster) {
      console.error("no monster to save");
      return;
    }

    dispatch(added(monster));
  }, [monster]);

  const handleRegenerate = useCallback(() => {
    createOne();
  }, []);

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
        <div className="monster-container">
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
          {Boolean(monster) && <MonsterPrompt monster={monster!} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
