import { IonList, IonListHeader } from "@ionic/react";

import { useParams } from "react-router";
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
    <IonList id="facilities-list">
      <IonListHeader>Facilities</IonListHeader>
      {facilities.map((fac) => (
        <FacilityItem facilityId={fac.id} key={fac.id} />
      ))}
      <LumberMillCard />
      <BreedingPenItem />
    </IonList>
  );
};

export default FacilitiesList;
