import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useBuildings } from "./useBuildings";
import BuildingCard from "./BuildingCard";

export default function HideoutPage() {
  const buildings = useBuildings((s) => s.buildings);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hideout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {buildings.map((b) => (
          <BuildingCard key={b.id} id={b.id} />
        ))}
      </IonContent>
    </IonPage>
  );
}
