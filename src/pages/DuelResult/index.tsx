import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import "./styles.css";
import ResultMessage from "./ResultMessage";

const DuelResultPage: React.FC = () => {
  const result = useAppSelector((state) => state.duel.result);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Duel Result</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Duel Result</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <ResultMessage result={result} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DuelResultPage;
