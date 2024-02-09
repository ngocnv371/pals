import { useAppSelector } from "../../store/hooks";
import { selectFacilitiesByBaseId } from "../../store/facilitiesSlice";
import { Suspense, lazy } from "react";
const LumberMillCard = lazy(() => import("../../components/LumberMill"));
const StonePitCard = lazy(() => import("../../components/LumberMill"));
const BreedingPenItem = lazy(
  () => import("../../components/BreedingPen/BreedingPenItem")
);

const facilityFactory = (type: string, facilityId: string) => {
  switch (type) {
    case "Stone Pit":
      return <StonePitCard facilityId={facilityId} />;
    case "Logging Site":
      return <LumberMillCard facilityId={facilityId} />;
    case "Breeding Pen":
      return <BreedingPenItem facilityId={facilityId} />;
    default:
      return null;
  }
};

const FacilitiesList: React.FC<{ baseId: string }> = ({ baseId }) => {
  const facilities = useAppSelector((state) =>
    selectFacilitiesByBaseId(state.facilities, baseId)
  );

  return (
    <div id="facilities-list">
      {facilities.map((fac) => (
        <Suspense key={fac.id}>
          <div>{facilityFactory(fac.type, fac.id)}</div>
        </Suspense>
      ))}
    </div>
  );
};

export default FacilitiesList;
