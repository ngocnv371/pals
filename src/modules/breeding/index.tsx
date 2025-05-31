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
  useIonToast,
} from "@ionic/react";
import { useCallback, useState } from "react";
import BeastPicker from "../cage/BeastPicker";
import { heart } from "ionicons/icons";
import BeastCard from "../cage/BeastCard";
import PriceItem from "../inventory/PriceItem";
import { Beast } from "../shared/types";
import { useAppStore } from "../store/useAppStore";

export default function BreedingPage() {
  const male = useAppStore((s) => s.maleBeastId);
  const setMale = useAppStore((s) => s.setMale);
  const female = useAppStore((s) => s.femaleBeastId);
  const setFemale = useAppStore((s) => s.setFemale);
  const canBreed = useAppStore((s) => s.canBreed());
  const breed = useAppStore((s) => s.breed);

  const [result, setResult] = useState<Beast>();
  const [presentToast] = useIonToast();

  const handleBreed = useCallback(() => {
    setResult(undefined);
    try {
      const result = breed();
      console.log("breed result", result);
      if (!result) {
        throw new Error("Failed to breed");
      }

      setResult(result);
    } catch (e) {
      console.error("failed to breed", e);
      presentToast({
        message: (e as any).message,
        color: "danger",
        duration: 3000,
      });
    }
  }, [breed]);

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
                value={male}
                onChange={setMale}
                filter={(b) => b.id != female}
              />
            </IonCol>
            <IonCol className="d-flex ion-justify-content-center">
              <BeastPicker
                value={female}
                onChange={setFemale}
                filter={(b) => b.id != male}
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
