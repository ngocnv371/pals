import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonProgressBar,
  IonRow,
} from "@ionic/react";
import { useBuildingById, useBuildings, useBuildingType } from "./useBuildings";
import "./BuildingCard.css";
import BeastPicker from "../cage/BeastPicker";
import { useCallback } from "react";
import { useCage } from "../cage/useCage";

type Props = {
  id: string;
};
export default function BuildingCard({ id }: Props) {
  const { assignWorker } = useBuildings();
  const { clearDuty, assignDuty } = useCage();
  const building = useBuildingById(id);
  const type = useBuildingType(building?.type!);

  const handleBeastChange = useCallback(
    (idx: number, beastId: string) => {
      if (!building) {
        return;
      }

      const currentBeast = building.workers[idx];
      if (currentBeast) {
        clearDuty(currentBeast);
      }

      assignWorker(building.id, idx, beastId);
      assignDuty(beastId, building.id);
    },
    [building]
  );

  if (!building) {
    return null;
  }

  if (!type) {
    return null;
  }

  return (
    <IonCard className="building-card">
      <IonProgressBar value={building.work / 500} />
      <IonImg src={`/facilities/${building.type}.png`} />
      <IonCardHeader>
        <IonCardTitle>{type.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{type.description}</IonCardContent>
      <IonGrid>
        <IonRow className="size-sm">
          {building.workers.map((b, idx) => (
            <IonCol key={idx} className="ion-no-padding">
              <BeastPicker
                value={b}
                onChange={(beastId) => handleBeastChange(idx, beastId)}
                filter={(k) => !k.building}
                placeholder="Select worker"
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonCard>
  );
}
