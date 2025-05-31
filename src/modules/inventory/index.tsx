import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { VirtuosoGrid } from "react-virtuoso";
import { SimpleGridComponents } from "../shared/SimpleGrid";
import InventoryItem from "./InventoryItem";
import { useAppStore } from "../store/useAppStore";

export default function InventoryPage() {
  const keys = useAppStore((x) => Object.keys(x.inventory));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <VirtuosoGrid
          className="cols-5"
          style={{ height: "100%" }}
          totalCount={keys.length}
          components={SimpleGridComponents}
          itemContent={(index) => <InventoryItem id={keys[index]} />}
        />
      </IonContent>
    </IonPage>
  );
}
