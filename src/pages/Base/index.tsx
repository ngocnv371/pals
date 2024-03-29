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
import { useAppSelector } from "../../store/hooks";
import { selectBaseById } from "../../store/basesSlice";
import FacilitiesList from "./FacilitiesList";
import RenameBaseButton from "./RenameBaseButton";
import AddFacilityButton from "./BuildMenu/AddFacilityButton";

const BasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const base = useAppSelector((state) => selectBaseById(state.bases, id));

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
          <IonButtons slot="end">
            <AddFacilityButton baseId={id} />
            <RenameBaseButton baseId={id} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{base.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FacilitiesList baseId={id} />
      </IonContent>
    </IonPage>
  );
};

export default BasePage;
