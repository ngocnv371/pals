import { useAppSelector } from "../../store/hooks";
import { selectFacilitiesByBaseId } from "../../store/facilitiesSlice";
import { Suspense, lazy } from "react";
const GenericFacility = lazy(() => import("../../components/GenericFacility"));
const Shop = lazy(() => import("../../components/Shop"));
const BreedingPenItem = lazy(
  () => import("../../components/BreedingPen/BreedingPenItem")
);

const facilityFactory = (type: string, facilityId: string) => {
  switch (type) {
    case "Breeding Pen":
      return <BreedingPenItem facilityId={facilityId} />;
    case "Shop":
      return <Shop facilityId={facilityId} />;
    default:
      return <GenericFacility facilityId={facilityId} />;
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
