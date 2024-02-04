import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";

import { hammer, home } from "ionicons/icons";
import { useContext } from "react";
import AppContext from "./AppContext/Context";
import { useParams } from "react-router";
import { getBaseById } from "./AppContext/getters";
import FacilityItem from "./FacilityItem";
import BreedingPenItem from "./BreedingPen/BreedingPenItem";

const FacilitiesList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bases } = useContext(AppContext)!;
  const base = getBaseById(bases, id);
  if (!base) {
    return null;
  }

  return (
    <IonList id="facilities-list">
      <IonListHeader>Facilities</IonListHeader>
      {base.facilities.map((fac) => (
        <FacilityItem facilityId={fac.id} key={fac.id} />
      ))}
      <BreedingPenItem />
    </IonList>
  );
};

export default FacilitiesList;
