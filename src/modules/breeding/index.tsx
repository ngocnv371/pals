import {
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCage } from "../cage/useCage";
import { useState } from "react";
import BeastPicker from "../cage/BeastPicker";
import { heart } from "ionicons/icons";

export default function BreedingPage() {
  const { beasts } = useCage();
  const [selectedBeastId1, setSelectedBeastId1] = useState<string | null>(null);
  const [selectedBeastId2, setSelectedBeastId2] = useState<string | null>(null);
  const canBreed = selectedBeastId1 && selectedBeastId2;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Breeding</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <BeastPicker
                value={selectedBeastId1}
                onChange={setSelectedBeastId1}
                filter={(b) => b.id != selectedBeastId2}
              />
            </IonCol>
            <IonCol>
              <BeastPicker
                value={selectedBeastId2}
                onChange={setSelectedBeastId2}
                filter={(b) => b.id != selectedBeastId1}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton color={"danger"} disabled={!canBreed}>
            <IonIcon icon={heart} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}
