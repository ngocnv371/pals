import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/react";
import PalsList from "../../components/PalPicker/PalsList";
import PalPreview from "../../components/PalPicker/PalPreview";
import { useState } from "react";
import "./styles.css";

const MyPalsPage: React.FC = () => {
  const [selected, setSelected] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Pals</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Pals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PalsList selected={selected} onSelect={setSelected} />
        <PalPreview palId={selected} />
      </IonContent>
    </IonPage>
  );
};

export default MyPalsPage;
