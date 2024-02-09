import { IonButton, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useAppDispatch } from "../../store/hooks";
import { worked } from "../../store/facilitiesSlice";

const StonePitCard: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const dispatch = useAppDispatch();

  function handleWork() {
    dispatch(worked(""));
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Stone Pit</IonCardTitle>
      </IonCardHeader>
      <IonButton fill="clear" onClick={handleWork}>
        Work
      </IonButton>
    </IonCard>
  );
};

export default StonePitCard;
