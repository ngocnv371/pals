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
import { useCallback, useEffect, useState } from "react";
import MonsterCard from "./MonsterCard";
import { generateMonster } from "./service";
import { refresh } from "ionicons/icons";
import "./styles.css";
import SettingsButton from "./SettingsButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { added, selectById } from "./beastiarySlice";
import MonsterPrompt from "./MonsterPrompt";
import DowloadButton from "./DownloadButton";

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
            <div>
              <MonsterCard monster={monster!}>
                <DowloadButton monsterId={monster.id} />
                <IonButton fill="clear" onClick={handleRegenerate}>
                  <IonIcon slot="start" icon={refresh}></IonIcon>
                  Regenerate
                </IonButton>
              </MonsterCard>
            </div>
          )}
          {Boolean(monster) && <MonsterPrompt monster={monster!} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
