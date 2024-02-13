import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
  IonToolbar,
} from "@ionic/react";
import BuyButton from "./BuyButton";
import { useAppSelector } from "../../store/hooks";
import { selectShopItemById } from "../../store/shopSlice";
import { useMemo } from "react";
import getMetadata from "../../data/metadata";

const ItemPreview: React.FC<
  {
    itemId: string;
  } & React.HtmlHTMLAttributes<HTMLIonCardElement>
> = ({ itemId, ...rest }) => {
  const item = useAppSelector((state) =>
    selectShopItemById(state.shop, itemId)
  );
  const meta = useMemo(() => getMetadata(itemId), [itemId]);

  if (!meta || !item) {
    return null;
  }

  return (
    <IonCard {...rest}>
      <IonItem lines="none">
        <IonAvatar className="borderless-avatar">
          <IonImg src={`/items/${itemId}.png`} />
        </IonAvatar>
        <IonLabel>
          <h3>
            {meta.name} x {item.quantity}
          </h3>
          <p>{item.price}G</p>
        </IonLabel>
      </IonItem>
      <IonCardContent>This is a thing</IonCardContent>
      <div className="card-end-actions flex z-index-99">
        <BuyButton itemId={itemId} price={item.price} />
      </div>
    </IonCard>
  );
};

export default ItemPreview;
