import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useMemo, useState } from "react";
import { BattleVisualizer } from "../Duel/Battle/BattleVisualizer";
import { CardStance } from "../Duel/model";

const winItems = ["kelpie", "blueplatypus"];
const looseItems = ["blueplatypus", "kelpie"];
const tieItems = ["kelpie", "kelpie"];

const TestBattleVisualizerPage: React.FC = () => {
  const [show, setShow] = useState(true);
  const [result, setResult] = useState(1);
  const [stance, setStance] = useState(CardStance.Offensive);

  const items = useMemo(() => {
    if (result > 0) {
      return winItems;
    } else if (result < 0) {
      return looseItems;
    } else {
      return tieItems;
    }
  }, [result]);

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
          <IonTitle>Test Battle</IonTitle>
          <IonSegment
            slot="end"
            value={result}
            onIonChange={(evt) => {
              setResult(+evt.detail.value!);
              reset();
            }}
          >
            <IonSegmentButton value={1}>Win</IonSegmentButton>
            <IonSegmentButton value={-1}>Loose</IonSegmentButton>
            <IonSegmentButton value={0}>Tie</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={stance}
            onIonChange={(evt) => {
              setStance(+evt.detail.value!);
              reset();
            }}
          >
            <IonSegmentButton value={CardStance.Offensive}>
              Offensive
            </IonSegmentButton>
            <IonSegmentButton value={CardStance.Defensive}>
              Defensive
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {show && (
          <BattleVisualizer
            card1={items[0]}
            card2={items[1]}
            card2Stance={stance}
            onCompleted={reset}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default TestBattleVisualizerPage;
