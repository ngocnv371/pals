import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCage } from "../cage/useCage";
import { useState } from "react";
import BeastPicker from "../cage/BeastPicker";

export default function BreedingPage() {
  const { beasts } = useCage();
  const [selectedBeastId1, setSelectedBeastId1] = useState<string | null>(null);
  const [selectedBeastId2, setSelectedBeastId2] = useState<string | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Breeding</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <BeastPicker
                value={selectedBeastId1}
                onChange={setSelectedBeastId1}
              />
            </IonCol>
            <IonCol>
              <BeastPicker
                value={selectedBeastId2}
                onChange={setSelectedBeastId2}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
