import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFacilityById, worked } from "../../store/facilitiesSlice";
import useNewItemNotification from "../NewItemNotification";
import { getFacilityType } from "../../data/facilities";
import RecipeIcon from "../RecipeIcon";

const GenericFacilityCard: React.FC<{ facilityId: string }> = ({
  facilityId,
}) => {
  const dispatch = useAppDispatch();
  const { present, dismiss } = useNewItemNotification();
  const facility = useAppSelector((state) =>
    selectFacilityById(state.facilities, facilityId)
  );
  const meta = getFacilityType(facility.type);

  async function handleWork() {
    const items = dispatch(worked(facilityId));
    await dismiss();
    items?.forEach((i) => present(i));
  }

  if (!facility || !meta) {
    return null;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{meta.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{meta.description}</IonCardContent>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
        }}
      >
        {facility.activeRecipeId && (
          <RecipeIcon recipeId={facility.activeRecipeId} />
        )}
        <IonButton
          fill="clear"
          size="large"
          onClick={handleWork}
          disabled={!facility.activeRecipeId}
        >
          Work
        </IonButton>
      </div>
    </IonCard>
  );
};

export default GenericFacilityCard;
