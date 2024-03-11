import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import MonsterCard from "./MonsterCard";
import "./styles.css";
import { useAppSelector } from "../../store/hooks";
import { selectById } from "./beastiarySlice";
import MonsterPrompt from "./MonsterPrompt";
import DowloadButton from "./DownloadButton";
import SelectAdapterButton from "../GPT/SelectAdapterButton";
import SetApiKeyButton from "../GPT/SetApiKeyButton";
import BatchCreateButton from "./BatchCreateButton";
import BatchFillCard from "./BatchFillCard";

const MonsterFactoryPage: React.FC = () => {
  const id = useAppSelector((state) => state.factory.currentId);
  const monster = useAppSelector((state) => selectById(state, id));

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

      <IonContent fullscreen>
        <div className="monster-container">
          {Boolean(monster) && (
            <div>
              <MonsterCard monster={monster!}>
                <DowloadButton monsterId={monster.id} />
              </MonsterCard>
            </div>
          )}
          <div>
            <BatchFillCard />
          </div>
          {Boolean(monster) && <MonsterPrompt monster={monster!} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MonsterFactoryPage;
