import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import React from "react";
import "./styles.css";
import DuelContainer from "./DuelContainer";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { duelStarted, selectStage } from "./duelSlice";
import { DuelStage } from "./model";

const DeckPage: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const dispatch = useAppDispatch();

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
