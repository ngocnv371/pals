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

const FusionOkPage: React.FC = () => {
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
          <IonTitle>Test Fusion OK</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {show && (
          <_FusionVisualizer
            card1="kelpie"
            card2="blueplatypus"
            result="soldierbee"
            onCompleted={reset}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default FusionOkPage;
