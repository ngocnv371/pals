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
import { useBeast, useCage } from "../cage/useCage";
import { useCallback, useState } from "react";
import BeastPicker from "../cage/BeastPicker";
import { heart } from "ionicons/icons";
import { useBreeder, useEgg } from "../cage/useEgg";
import { Beast } from "../cage/types";
import BeastCard from "../cage/BeastCard";
import PriceItem from "../inventory/PriceItem";

export default function BreedingPage() {
  const { breed } = useBreeder();
  const { hatch } = useEgg();
  const [selectedBeastId1, setSelectedBeastId1] = useState<string | null>(null);
  const [selectedBeastId2, setSelectedBeastId2] = useState<string | null>(null);
  const beast1 = useBeast(selectedBeastId1!);
  const beast2 = useBeast(selectedBeastId2!);
  const [result, setResult] = useState<Beast>();
  const canBreed = selectedBeastId1 && selectedBeastId2;

  const handleBreed = useCallback(() => {
    setResult(undefined);
    if (!beast1?.pal) {
      console.warn("beast1 not selected");
      return;
    }

    if (!beast2?.pal) {
      console.warn("beast2 not selected");
      return;
    }

    try {
      const result = breed(beast1.pal, beast2.pal);
      console.log("breed result", result);
      const beast = hatch(result);
      setResult(beast);
    } catch (e) {
      console.error("failed to breed", e);
    }
  }, [beast1?.pal, beast2?.pal]);

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
            <IonCol className="d-flex ion-justify-content-center">
              <BeastPicker
                value={selectedBeastId1}
                onChange={setSelectedBeastId1}
                filter={(b) => b.id != selectedBeastId2}
              />
            </IonCol>
            <IonCol className="d-flex ion-justify-content-center">
              <BeastPicker
                value={selectedBeastId2}
                onChange={setSelectedBeastId2}
                filter={(b) => b.id != selectedBeastId1}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="d-flex ion-justify-content-center">
              <PriceItem id="cake" quantity={1} />
            </IonCol>
          </IonRow>
          {result && (
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <BeastCard id={result.id} />
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          )}
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton
            color={"danger"}
            disabled={!canBreed}
            onClick={handleBreed}
          >
            <IonIcon icon={heart} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}
