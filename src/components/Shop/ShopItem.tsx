import { IonAvatar, IonBadge, IonCard, IonImg } from "@ionic/react";

const ShopItem: React.FC<
  {
    itemId: string;
    price: number;
  } & React.HtmlHTMLAttributes<HTMLIonCardElement>
> = ({ itemId, price, ...rest }) => {
  return (
    <IonCard {...rest}>
      <IonAvatar className="borderless-avatar">
        <IonImg src={`/items/${itemId}.png`} />
      </IonAvatar>
      <IonBadge>{price}G</IonBadge>
    </IonCard>
  );
};

export default ShopItem;
