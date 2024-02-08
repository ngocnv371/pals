import { IonAvatar, IonImg } from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import { selectPalById } from "../../store/palsSlice";
import getPalMetadata from "../../data/palMetadata";

const PalAvatar: React.FC<{ palId: string } & React.HTMLAttributes<HTMLIonAvatarElement>> = ({ palId, ...rest }) => {
  const pal = useAppSelector(state => selectPalById(state.pals, palId))
  if (!pal) {
    return null;
  }

  const meta = getPalMetadata(pal.type);
  if (!meta) {
    return null;
  }

  return (
    <IonAvatar {...rest}>
      <IonImg src={`/pals/${meta.content.image}`} />
    </IonAvatar>
  );
};

export default PalAvatar;
