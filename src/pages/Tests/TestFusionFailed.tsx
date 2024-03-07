import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { _FusionVisualizer } from "../Duel/Fusion/FusionVisualizer";
import { useState } from "react";

const FusionFailedPage: React.FC = () => {
  const [show, setShow] = useState(true);

  function reset() {
    setShow(false);
    setTimeout(() => setShow(true), 50);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tests" />
          </IonButtons>
          <IonTitle>Test Fusion Failed</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {show && (
          <_FusionVisualizer card1="kelpie" card2="blueplatypus" result="" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default FusionFailedPage;
