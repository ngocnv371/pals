import { IonContent, IonPage } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./styles.css";
import ResultMessage from "./ResultMessage";
import LootBox from "../../components/LootBox";
import { useCallback } from "react";
import { getDuelReward } from "../Duel/store/thunk-actions";
import { selectResult } from "../Duel/store/selectors";

const DuelResultPage: React.FC = () => {
  const result = useAppSelector(selectResult);
  const dispatch = useAppDispatch();

  const handleDrawReward = useCallback(async () => {
    const reward = await dispatch(getDuelReward());
    return reward;
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container bg1">
          <ResultMessage result={result} />
          {result == "win" && (
            <LootBox count={5} drawReward={handleDrawReward} />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DuelResultPage;
