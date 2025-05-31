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
import "./BuildingCard.css";
import BeastPicker from "../cage/BeastPicker";
import { useCallback } from "react";
import { useAppStore } from "../store/useAppStore";
import { useBuilding } from "./useBuilding";

type Props = {
  id: string;
};
export default function BuildingCard({ id }: Props) {
  const assignWorker = useAppStore((s) => s.assignWorker);
  const building = useBuilding(id);

  const handleBeastChange = useCallback(
    (idx: number, beastId: string) => {
      if (!building) {
        return;
      }

      assignWorker(building.id, idx, beastId);
    },
    [building]
  );

  if (!building) {
    return null;
  }

  return (
    <IonCard className="building-card">
      <IonProgressBar value={(building.status?.work || 0) / 500} />
      <IonImg src={`/facilities/${building.type}.png`} />
      <IonCardHeader>
        <IonCardTitle>{building.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{building.description}</IonCardContent>
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
