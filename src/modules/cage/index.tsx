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
import { VirtuosoGrid, VirtuosoGridProps } from "react-virtuoso";
import { forwardRef, useCallback, useState } from "react";
import BeastCard from "./BeastCard";
import "./styles.css";
import BeastModal from "./BeastModal";

// Ensure that the component definitions are not declared inline in the component function,
// Otherwise the grid will remount with each render due to new component instances.
const gridComponents: VirtuosoGridProps<undefined, undefined>["components"] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div ref={ref} {...props} className="grid-list">
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div {...props} className="grid-item">
      {children}
    </div>
  ),
};

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
          components={gridComponents}
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
