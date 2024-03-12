import { IonPage, IonContent, IonButton, useIonRouter } from "@ionic/react";
import React, { useEffect } from "react";
import "./styles.css";
import DuelContainer from "./DuelContainer";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectStage } from "./store/selectors";
import { duelStarted } from "./store/thunk-actions";
import { DuelStage } from "./model";
import "./effects.css";

const DeckPage: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const dispatch = useAppDispatch();
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
        {stage == DuelStage.Start ? (
          <IonButton onClick={() => dispatch(duelStarted())}>Start</IonButton>
        ) : (
          <DuelContainer />
        )}
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
