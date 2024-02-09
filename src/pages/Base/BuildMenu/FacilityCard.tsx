import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useMemo } from "react";
import { getFacilityType } from "../../../data/facilities";

const FacilityCard: React.FC<{
  type: string;
  selected?: boolean;
  onSelect?: () => void;
}> = ({ type, selected, onSelect }) => {
  const info = useMemo(() => getFacilityType(type), []);
  if (!info) {
    return null;
  }

  return (
    <IonCard
      style={{ width: "15em" }}
      color={selected ? "primary" : ""}
      onClick={onSelect}
    >
      <IonImg src={`/facilities/${type.toLocaleLowerCase()}.png`} />
      <IonCardHeader>
        <IonCardTitle>{info.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{info.description}</IonCardContent>
    </IonCard>
  );
};

export default FacilityCard;
