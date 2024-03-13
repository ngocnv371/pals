import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import MatchSettingsCard from "./MatchSettingsCard";
import { search } from "ionicons/icons";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { duelStarted } from "../Duel/store/thunk-actions";

const LobbyPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const handleFind = () => {
    setLoading(true);
    // fake search
    setTimeout(() => {
      setLoading(false);
      dispatch(duelStarted());
      router.push("/duel");
    }, 1200);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lobby</IonTitle>
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate" />}
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lobby</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MatchSettingsCard />
        <div className="ion-padding flex ion-justify-content-center">
          <IonButton size="large" onClick={handleFind}>
            <IonIcon slot="start" icon={search} />
            Find Match
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LobbyPage;
