import FacilityItem from "./FacilityItem";
import BreedingPenItem from "./BreedingPen/BreedingPenItem";
import { useAppSelector } from "../store/hooks";
import { selectFacilitiesByBaseId } from "../store/facilitiesSlice";
import LumberMillCard from "./LumberMill";

const FacilitiesList: React.FC<{ baseId: string }> = ({ baseId }) => {
  const facilities = useAppSelector((state) =>
    selectFacilitiesByBaseId(state.bases, baseId)
  );

  return (
    <div id="facilities-list">
      {facilities.map((fac) => (
        <FacilityItem facilityId={fac.id} key={fac.id} />
      ))}
      <LumberMillCard />
      <BreedingPenItem />
    </div>
  );
};

export default FacilitiesList;
