import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
} from "@ionic/react";
import InventoryList from "../../components/InventoryList";
import ItemPreview from "./ItemPreview";
import { useState } from "react";

const InventoryPage: React.FC = () => {
  const [selected, setSelected] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inventory</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InventoryList onSelect={setSelected} />
      </IonContent>
      {Boolean(selected) && (
        <IonFooter>
          <ItemPreview itemId={selected} />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default InventoryPage;
