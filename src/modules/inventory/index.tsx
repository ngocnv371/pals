import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useInventory } from "./useInventory";
import { VirtuosoGrid } from "react-virtuoso";
import { SimpleGridComponents } from "../shared/SimpleGrid";
import InventoryItem from "./InventoryItem";

export default function InventoryPage() {
  const keys = useInventory((x) => Object.keys(x.inventory));

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
