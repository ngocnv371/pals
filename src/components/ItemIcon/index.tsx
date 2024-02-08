import { IonAvatar, IonBadge, IonImg, IonText } from "@ionic/react";
import Item from "../../models/item";
import "./styles.css";

const ItemIcon: React.FC<
  { item: Item } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ item, ...rest }) => {
  return (
    <div
      itemType="item"
      itemID={item.id.toString()}
      className="item-icon"
      style={{ position: "relative" }}
      {...rest}
    >
      <IonAvatar>
        <IonImg src={`/items/${item.id}.png`} />
      </IonAvatar>
      <IonBadge>{item.quantity}</IonBadge>
    </div>
  );
};

export default ItemIcon;
