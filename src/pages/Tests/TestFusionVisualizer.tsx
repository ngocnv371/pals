import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { FusionVisualizer } from "../Duel/Fusion/FusionVisualizer";
import { useState } from "react";

const FusionVisualizerPage: React.FC = () => {
  const [show, setShow] = useState(true);
  const [valid, setValid] = useState(true);
  const result = valid ? "soldierbee" : "";

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
          <IonTitle>Test Fusion Visualizer</IonTitle>
          <IonButtons slot="end">
            <IonToggle
              checked={valid}
              onIonChange={(evt) => {
                const checked = evt.detail.checked;
                setValid(checked);
                reset();
              }}
            >
              Valid Fusion
            </IonToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {show && (
          <FusionVisualizer
            card1="kelpie"
            card2="blueplatypus"
            result={result}
            onCompleted={reset}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default FusionVisualizerPage;
