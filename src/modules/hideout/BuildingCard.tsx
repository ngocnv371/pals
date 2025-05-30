import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import { useBuildingById, useBuildingType } from "./useBuildings";
import "./BuildingCard.css";

type Props = {
  id: string;
};
export default function BuildingCard({ id }: Props) {
  const building = useBuildingById(id);
  const type = useBuildingType(building?.type!);

  if (!building) {
    return null;
  }

  if (!type) {
    return null;
  }

  return (
    <IonCard className="building-card">
      <IonImg src={`/facilities/${building.type}.png`} />
      <IonCardHeader>
        <IonCardTitle>{type.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{type.description}</IonCardContent>
    </IonCard>
  );
}
