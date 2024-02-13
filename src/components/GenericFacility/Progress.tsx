import {
  IonProgressBar,
} from "@ionic/react";
import { getRecipeById } from "../../data/recipes";
import {
  selectFacilityById,
} from "../../store/facilitiesSlice";
import { useAppSelector } from "../../store/hooks";

const Progress: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const facility = useAppSelector((state) =>
    selectFacilityById(state.facilities, facilityId)
  );
  const recipe = facility.activeRecipeId
    ? getRecipeById(facility.activeRecipeId)
    : undefined;

  if (!facility) {
    return null;
  }

  if (!facility.work || !recipe?.ingredients.work) {
    return null;
  }

  return <IonProgressBar value={facility.work! / recipe?.ingredients.work} />;
};

export default Progress;
