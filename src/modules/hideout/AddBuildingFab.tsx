import { useCallback, useState } from "react";
import { IonButton, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import BlueprintPicker from "./BlueprintPicker";
import { useAppStore } from "../store/useAppStore";
import { add } from "ionicons/icons";

export default function AddBuildingFab() {
  const [modalOpen, setModalOpen] = useState(false);
  const constructBuilding = useAppStore((s) => s.addBuilding);

  const handleSelected = useCallback(
    (typeId: string) => {
      constructBuilding(typeId);
      setModalOpen(false);
    },
    [constructBuilding]
  );

  return (
    <>
      <BlueprintPicker
        isOpen={modalOpen}
        onDidDismiss={() => setModalOpen(false)}
        onChange={handleSelected}
      />
      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton onClick={() => setModalOpen(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </>
  );
}
