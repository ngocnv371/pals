import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import React, { useEffect } from "react";
import "./styles.css";
import DuelContainer from "./DuelContainer";
import { useAppSelector } from "../../store/hooks";
import "./effects.css";
import { selectStage } from "./v2/selectors";
import { Stage } from "./v2/model";

const DeckPage: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const result = useAppSelector((state) => state.duel.result);
  const router = useIonRouter();

  // detect end game
  useEffect(() => {
    console.debug("game result changed", result);
    if (result != "unresolved") {
      router.push("/duel-result");
    }
  }, [result]);

  return (
    <IonPage>
      <IonContent fullscreen>
        {stage !== Stage.Started && <DuelContainer />}
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
