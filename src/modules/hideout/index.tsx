import {
  IonContent,
  IonFab,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BuildingCard from "./BuildingCard";
import { useAppStore } from "../store/useAppStore";
import AddBuildingFab from "./AddBuildingFab";

export default function HideoutPage() {
  const keys = useAppStore((s) => s.buildings.map((b) => b.id));
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hideout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {keys.map((b) => (
          <BuildingCard key={b} id={b} />
        ))}
        <AddBuildingFab />
      </IonContent>
    </IonPage>
  );
}
