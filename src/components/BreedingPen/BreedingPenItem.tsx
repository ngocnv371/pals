import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import PalPicker from "../PalPicker/PalPicker";
import { heart } from "ionicons/icons";
import BreedButton from "./BreedButton";
import { useState } from "react";

const BreedingPenItem: React.FC = () => {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  return (
    <>
      <IonListHeader>Breeding Pen</IonListHeader>
      <PalPicker gender="male" value={p1} onSelect={setP1} />
      <PalPicker gender="female" value={p2} onSelect={setP2} />
      <BreedButton parent1={p1} parent2={p2} />
    </>
  );
};

export default BreedingPenItem;
