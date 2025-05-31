import { IonButton, IonIcon } from "@ionic/react";
import { arrowUpRightBox } from "ionicons/icons";
import { useCallback } from "react";
import { useAppStore } from "../store/useAppStore";
import { createRandomBeast } from "./utils";

export default function OpenEggButton() {
  const addBeast = useAppStore((s) => s.addBeast);

  const handleOpenEgg = useCallback(() => {
    const beast = createRandomBeast();
    addBeast(beast);
  }, [addBeast]);

  return (
    <IonButton onClick={handleOpenEgg}>
      <IonIcon icon={arrowUpRightBox} /> Open Egg
    </IonButton>
  );
}
