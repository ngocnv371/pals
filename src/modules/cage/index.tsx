import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OpenEggButton from "./OpenEggButton";
import { VirtuosoGrid } from "react-virtuoso";
import { useCallback, useState } from "react";
import BeastCard from "./BeastCard";
import BeastModal from "./BeastModal";
import { SimpleGridComponents } from "../shared/SimpleGrid";
import { useAppStore } from "../store/useAppStore";

export default function CagePage() {
  const ids = useAppStore((state) => state.beasts.map((b) => b.id));
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
          totalCount={ids.length}
          components={SimpleGridComponents}
          itemContent={(index) => (
            <BeastCard
              id={ids[index]}
              onClick={() => previewBeast(ids[index])}
            />
          )}
        />
      </IonContent>
    </IonPage>
  );
}
