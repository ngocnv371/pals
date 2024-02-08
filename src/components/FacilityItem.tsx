import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { hammer, home } from "ionicons/icons";
import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { selectFacilityById } from "../store/facilitiesSlice";
import getMetadata from "../data/metadata";

const FacilityItem: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const facility = useAppSelector(state => selectFacilityById(state.facilities, facilityId))
  if (!facility) {
    return null;
  }

  const data = useMemo(() => getMetadata(facilityId), [facilityId]);

  function handleClick() {
    console.debug("work");
  }

  return (
    <IonItem lines="inset" onClick={handleClick}>
      <IonIcon aria-hidden="true" slot="start" md={home} />
      <IonLabel>{data?.name}</IonLabel>
      <IonIcon aria-hidden="true" slot="end" md={hammer} />
    </IonItem>
  );
};

export default FacilityItem;
