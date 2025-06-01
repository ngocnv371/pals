import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";
import { MouseEventHandler, useMemo } from "react";
import PriceItem from "../inventory/PriceItem";
import { typedFacilities } from "./utils";
import "./BlueprintCard.css";
import { useAppStore } from "../store/useAppStore";

type Props = {
  id: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLIonCardElement>;
};
export default function BlueprintCard({ id, disabled, onClick }: Props) {
  const blueprint = useMemo(() => typedFacilities[id], [id]);
  const canBuy = useAppStore((s) => s.canRemoveItems);
  const affordable = useMemo(
    () => canBuy(blueprint.price),
    [canBuy, blueprint]
  );

  if (!blueprint) {
    return null;
  }

  return (
    <IonCard
      key={blueprint.id}
      onClick={onClick}
      disabled={disabled}
      className="blueprint-card cursor-pointer"
      color={affordable ? "primary" : "danger"}
    >
      <IonImg src={`/facilities/${blueprint.id}.png`} />
      <IonCardHeader>
        <IonCardTitle>{blueprint.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{blueprint.description}</IonCardContent>
      <IonGrid>
        <IonRow>
          {Object.keys(blueprint.price).map((item) => (
            <IonCol key={item} className="d-flex">
              <PriceItem id={item} quantity={blueprint.price[item]} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonCard>
  );
}
