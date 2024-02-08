import { IonButton, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useAppDispatch } from "../../store/hooks";
import { worked } from "../../store/facilitiesSlice";

const LumberMillCard: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleWork() {
    dispatch(worked(""));
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Lumber Mill</IonCardTitle>
      </IonCardHeader>
      <IonButton fill="clear" onClick={handleWork}>
        Work
      </IonButton>
    </IonCard>
  );
};

export default LumberMillCard;
