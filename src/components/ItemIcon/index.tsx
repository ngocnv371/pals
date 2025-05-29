import { IonAvatar, IonBadge, IonImg, IonText } from "@ionic/react";
import "./styles.css";

const ItemIcon: React.FC<
  {
    id: string;
    quantity: string | number;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ id, quantity, ...rest }) => {
  return (
    <div itemType="item" itemID={id.toString()} className="item-icon" {...rest}>
      <IonAvatar>
        <IonImg src={`/items/${id}.png`} />
      </IonAvatar>
      <IonBadge>{quantity}</IonBadge>
    </div>
  );
};

export default ItemIcon;
