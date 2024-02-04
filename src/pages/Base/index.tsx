import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { useContext } from "react";
import AppContext from "../../components/AppContext/Context";
import { getBaseById } from "../../components/AppContext/getters";
import FacilitiesList from "../../components/FacilitiesList";

const BasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bases } = useContext(AppContext)!;
  const base = getBaseById(bases, id);

  if (!base) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{base.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{base.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FacilitiesList />
      </IonContent>
    </IonPage>
  );
};

export default BasePage;
