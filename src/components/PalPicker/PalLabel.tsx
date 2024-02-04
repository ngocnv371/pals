import { IonLabel } from "@ionic/react";
import { useContext } from "react";
import AppContext from "../AppContext/Context";
import getMetadata, { getPalMetadata } from "../AppContext/meta";

const PalLabel: React.FC<
  { palId: string } & React.HTMLAttributes<HTMLIonLabelElement>
> = ({ palId, ...rest }) => {
  const { pals } = useContext(AppContext)!;
  const pal = pals.find((p) => p.id == palId);
  if (!pal) {
    return null;
  }

  const meta = getPalMetadata(pal.specieId);
  if (!meta) {
    return null;
  }

  return (
    <IonLabel {...rest}>
      {meta.name} Lv{pal.level}
    </IonLabel>
  );
};

export default PalLabel;
