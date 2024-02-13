import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonFooter,
  IonLabel,
} from "@ionic/react";
import ShopItem from "./ShopItem";
import { useMemo, useRef, useState } from "react";
import { Chance } from "chance";
import { entities } from "../../data/metadata";
import ItemPreview from "./ItemPreview";
import BalanceLabel from "./BalanceLabel";
import { useAppSelector } from "../../store/hooks";
import { selectAllShopItems } from "../../store/shopSlice";
import RestockButton from "./RestockButton";

const BrowseButton: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [selected, setSelected] = useState("");

  const items = useAppSelector((state) => selectAllShopItems(state.shop));

  return (
    <>
      <IonButton
        fill="clear"
        size="large"
        onClick={() => modal.current?.present()}
      >
        Browse
      </IonButton>
      <IonModal ref={modal}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Done
              </IonButton>
            </IonButtons>
            <IonTitle>Let's see what you got</IonTitle>
            <IonButtons slot="end">
              <RestockButton />
              <BalanceLabel />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {items.map((i) => (
              <ShopItem
                key={i.id}
                itemId={i.id}
                price={i.price}
                color={i.id == selected ? "primary" : ""}
                onClick={() => setSelected(i.id)}
              />
            ))}
          </div>
        </IonContent>
        {Boolean(selected) && (
          <IonFooter>
            <ItemPreview itemId={selected} />
          </IonFooter>
        )}
      </IonModal>
    </>
  );
};

export default BrowseButton;
