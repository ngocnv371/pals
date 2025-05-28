import { IonButton, IonIcon } from "@ionic/react";
import { arrowUpRightBox } from "ionicons/icons";
import { useEgg } from "./useEgg";

export default function OpenEggButton() {
  const { open } = useEgg();
  return (
    <IonButton onClick={open}>
      <IonIcon icon={arrowUpRightBox} /> Open Egg
    </IonButton>
  );
}
