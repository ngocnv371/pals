import { IonButton, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useAppDispatch } from "../../store/hooks";
import { worked } from "../../store/facilitiesSlice";
import useNewItemNotification from "../NewItemNotification";

const LumberMillCard: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const dispatch = useAppDispatch();
  const { present, dismiss } = useNewItemNotification();

  async function handleWork() {
    const items = dispatch(worked(facilityId));
    await dismiss();
    items?.forEach((i) => present(i));
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
