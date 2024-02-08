import { IonLabel } from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import { selectPalById } from "../../store/palsSlice";
import getPalMetadata from "../../data/palMetadata";

const PalLabel: React.FC<
  { palId: string } & React.HTMLAttributes<HTMLIonLabelElement>
> = ({ palId, ...rest }) => {
  const pal = useAppSelector((state) => selectPalById(state.pals, palId));
  if (!pal) {
    return null;
  }

  const meta = getPalMetadata(pal.type);
  if (!meta) {
    return null;
  }

  return (
    <IonLabel {...rest}>
      {meta.title} Lv{pal.level}
    </IonLabel>
  );
};

export default PalLabel;
