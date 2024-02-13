import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { getFacilityType } from "../../data/facilities";
import { selectFacilityById } from "../../store/facilitiesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useNewItemNotification from "../NewItemNotification";
import BrowseButton from "./BrowseButton";

const Shop: React.FC<{ facilityId: string }> = ({ facilityId }) => {
  const dispatch = useAppDispatch();
  const { present, dismiss } = useNewItemNotification();
  const facility = useAppSelector((state) =>
    selectFacilityById(state.facilities, facilityId)
  );
  const meta = getFacilityType(facility.type);
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
        <BrowseButton facilityId={facilityId} />
      </div>
    </IonCard>
  );
};

export default Shop;
