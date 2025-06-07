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
import { useCallback, useState } from "react";
import ItemModal from "./ItemModal";

export default function InventoryPage() {
  const keys = useAppStore((x) => Object.keys(x.inventory));
  const [inspectItemId, setInspectBeastId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const previewItem = useCallback((id: string) => {
    setInspectBeastId(id);
    setShowModal(true);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ItemModal
          id={inspectItemId}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        />
        <VirtuosoGrid
          className="cols-5"
          style={{ height: "100%" }}
          totalCount={keys.length}
          components={SimpleGridComponents}
          itemContent={(index) => (
            <InventoryItem
              id={keys[index]}
              onClick={() => previewItem(keys[index])}
            />
          )}
        />
      </IonContent>
    </IonPage>
  );
}
