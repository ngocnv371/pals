import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useItemInfo } from "./useItemInfo";
import EggInfoList from "./EggInfoList";

type Props = {
  id: string;
  isOpen: boolean;
  onDidDismiss?: () => void;
};
export default function ItemModal({ id, isOpen, onDidDismiss }: Props) {
  const item = useItemInfo(id);

  if (!item) {
    return null;
  }

  const isEgg = item.type && item.type.includes("egg");

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
          <IonTitle>{item.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg
          src={`/items/${item.type || item.id}.png`}
          style={{ maxWidth: 60, margin: "0 auto" }}
        />
        {item.name != item.name && <h3>{item.name}</h3>}
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        {isEgg && <EggInfoList egg={item as any} />}
      </IonContent>
    </IonModal>
  );
}
