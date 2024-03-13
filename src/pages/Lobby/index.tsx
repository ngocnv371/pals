import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import MatchSettingsCard from "./MatchSettingsCard";
import { useCallback, useState } from "react";
import FindMatchButton from "./FindMatchButton";

const LobbyPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleFind = useCallback(() => {
    setLoading(true);
    // disable for just a bit
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

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
          <FindMatchButton onClick={handleFind} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LobbyPage;
