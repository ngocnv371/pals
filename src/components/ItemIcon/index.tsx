import { IonAvatar, IonBadge, IonImg, IonText } from "@ionic/react";
import "./styles.css";

const ItemIcon: React.FC<
  {
    type: string;
    quantity: string | number;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ type, quantity, ...rest }) => {
  return (
    <div
      itemType="item"
      itemID={type.toString()}
      className="item-icon"
      {...rest}
    >
      <IonAvatar>
        <IonImg src={`/items/${type}.png`} />
      </IonAvatar>
      <IonBadge>{quantity}</IonBadge>
    </div>
  );
};

export default ItemIcon;
