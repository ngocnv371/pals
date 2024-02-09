import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import PalPicker from "../PalPicker/PalPicker";
import { heart } from "ionicons/icons";
import BreedButton from "./BreedButton";
import { useState } from "react";

const BreedingPenCard: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Breeding Pen</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <PalPicker gender="male" value={p1} onSelect={setP1} />
        <PalPicker gender="female" value={p2} onSelect={setP2} />
        <BreedButton parent1={p1} parent2={p2} />
      </IonList>
    </IonCard>
  );
};

export default BreedingPenCard;
