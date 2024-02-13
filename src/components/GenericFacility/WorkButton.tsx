import { IonButton, IonProgressBar } from "@ionic/react";
import { selectFacilityById, worked } from "../../store/facilitiesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useNewItemNotification from "../NewItemNotification";

const WorkButton: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const dispatch = useAppDispatch();
  const { present, dismiss } = useNewItemNotification();
  const facility = useAppSelector((state) =>
    selectFacilityById(state.facilities, facilityId)
  );

  if (!facility) {
    return null;
  }

  async function handleWork() {
    const items = dispatch(worked(facilityId));
    await dismiss();
    items?.forEach((i) => present(i));
  }

  return (
    <IonButton
      fill="clear"
      size="large"
      onClick={handleWork}
      disabled={!facility.activeRecipeId}
    >
      Work
      <IonProgressBar value={10} />
    </IonButton>
  );
};

export default WorkButton;
