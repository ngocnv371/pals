import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OpenEggButton from "./OpenEggButton";
import { useCage } from "./useCage";
import { VirtuosoGrid } from "react-virtuoso";
import { useCallback, useState } from "react";
import BeastCard from "./BeastCard";
import BeastModal from "./BeastModal";
import { SimpleGridComponents } from "../shared/SimpleGrid";

export default function CagePage() {
  const { beasts } = useCage();
  const [inspectBeastId, setInspectBeastId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const previewBeast = useCallback((id: string) => {
    setInspectBeastId(id);
    setShowModal(true);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <OpenEggButton />
          </IonButtons>
          <IonTitle>Cage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <BeastModal
          id={inspectBeastId}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        />
        <VirtuosoGrid
          style={{ height: "100%" }}
          totalCount={beasts.length}
          components={SimpleGridComponents}
          itemContent={(index) => (
            <BeastCard
              id={beasts[index].id}
              onClick={() => previewBeast(beasts[index].id)}
            />
          )}
        />
      </IonContent>
    </IonPage>
  );
}
