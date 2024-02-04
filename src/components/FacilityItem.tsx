import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { hammer, home } from "ionicons/icons";
import { useContext, useMemo } from "react";
import { useParams } from "react-router";
import AppContext from "./AppContext/Context";
import { getBaseById, getFacilityById } from "./AppContext/getters";
import getMetadata from "./AppContext/meta";

const FacilityItem: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const { id } = useParams<{ id: string }>();
  const { bases } = useContext(AppContext)!;

  const facility = getFacilityById(bases, id, facilityId);
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
