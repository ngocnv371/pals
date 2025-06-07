import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Egg } from "../shared/types";

type Props = {
  egg: Egg;
};
export default function EggInfoList({ egg }: Props) {
  return (
    <IonList>
      <IonList>
        <IonItem>
          <IonLabel>Type</IonLabel>
          <IonLabel slot="end">Egg</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Breeding Power</IonLabel>
          <IonLabel slot="end">{egg.breedingPower}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Traits</IonLabel>
          <IonLabel slot="end">{egg.heritableTraits.join(", ")}</IonLabel>
        </IonItem>
      </IonList>
    </IonList>
  );
}
