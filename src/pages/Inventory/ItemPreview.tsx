import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import { useMemo } from "react";
import getMetadata from "../../data/metadata";
import { selectItemById } from "../../store/inventorySlice";
import HatchButton from "./HatchButton";

const ItemPreview: React.FC<
  {
    itemId: string;
  } & React.HtmlHTMLAttributes<HTMLIonCardElement>
> = ({ itemId, ...rest }) => {
  const item = useAppSelector((state) =>
    selectItemById(state.inventory, itemId)
  );
  const meta = useMemo(() => getMetadata(itemId), [itemId]);

  if (!meta || !item) {
    return null;
  }

  return (
    <IonCard {...rest}>
      <IonItem lines="none">
        <IonAvatar className="borderless-avatar" slot="start">
          <IonImg src={`/items/${itemId}.png`} />
        </IonAvatar>
        <IonLabel>
          <h3>
            {meta.name} x {item.quantity}
          </h3>
        </IonLabel>
      </IonItem>
      <IonCardContent>This is a thing</IonCardContent>
      <div className="card-end-actions flex z-index-99">
        {meta.name.includes("egg") && <HatchButton itemId={itemId} />}
      </div>
    </IonCard>
  );
};

export default ItemPreview;
