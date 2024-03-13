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
import LootBox from "../../components/LootBox";

const DuelResultPage: React.FC = () => {
  const result = useAppSelector((state) => state.duel.result);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container bg1">
          <ResultMessage result={result} />
          <LootBox count={3} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DuelResultPage;
