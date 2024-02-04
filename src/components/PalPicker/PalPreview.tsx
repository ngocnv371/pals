import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
} from "@ionic/react";
import { useContext } from "react";
import AppContext from "../AppContext/Context";
import getMetadata from "../AppContext/meta";

const PalPreview: React.FC<{ palId: string }> = ({ palId }) => {
  const { pals } = useContext(AppContext)!;
  const pal = pals.find((p) => p.id == palId);
  if (!pal) {
    return null;
  }

  const meta = getMetadata(pal.specieId);
  if (!meta) {
    return null;
  }

  return (
    <IonCard className="pal-preview">
      <IonCardHeader>
        <IonCardTitle>
          {meta.name} Lv{pal.level} {pal.gender}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>Detail {palId}</IonCardContent>
    </IonCard>
  );
};

export default PalPreview;
