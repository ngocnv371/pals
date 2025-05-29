import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useInventory } from "./useInventory";
import { VirtuosoGrid } from "react-virtuoso";
import { SimpleGridComponents } from "../shared/SimpleGrid";
import ItemIcon from "../../components/ItemIcon";

export default function InventoryPage() {
  const { inventory } = useInventory();
  const keys = Object.keys(inventory);

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
          itemContent={(index) => (
            <ItemIcon
              item={{ id: keys[index], quantity: inventory[keys[index]] }}
            />
          )}
        />
      </IonContent>
    </IonPage>
  );
}
