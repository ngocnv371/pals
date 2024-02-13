import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  recipeSelected,
  selectFacilityById,
} from "../../store/facilitiesSlice";
import { getFacilityType } from "../../data/facilities";
import RecipePicker from "./RecipePicker";
import WorkButton from "./WorkButton";
import Progress from "./Progress";
import { useCallback, useMemo } from "react";

const GenericFacilityCard: React.FC<{ facilityId: string }> = ({
  facilityId,
}) => {
  const dispatch = useAppDispatch();
  const facility = useAppSelector((state) =>
    selectFacilityById(state.facilities, facilityId)
  );
  const meta = useMemo(() => getFacilityType(facility.type), [facility.type]);

  const handleRecipeChanged = useCallback(
    (id: string) => {
      dispatch(recipeSelected({ facilityId, recipeId: id }));
    },
    [facilityId]
  );

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
        <RecipePicker
          facility={facility.type}
          value={facility.activeRecipeId}
          onChange={handleRecipeChanged}
        />
        <WorkButton facilityId={facilityId} />
      </div>
      <Progress facilityId={facilityId} />
    </IonCard>
  );
};

export default GenericFacilityCard;
