import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppDispatch } from "../../../store/hooks";
import { useMemo, useRef, useState } from "react";
import { add } from "ionicons/icons";
import { getAllFacilityTypes } from "../../../data/facilities";
import FacilityCard from "./FacilityCard";
import { facilityCreated } from "../../../store/facilitiesSlice";

const AddFacilityButton: React.FC<{ baseId: string }> = ({ baseId }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const dispatch = useAppDispatch();
  const [type, setType] = useState("");

  const items = useMemo(() => getAllFacilityTypes(), []);

  const handleConfirm = () => {
    dispatch(facilityCreated(type, baseId));
    modal.current?.dismiss();
  };

  return (
    <>
      <IonButton id="add-facility-btn">
        <IonIcon icon={add} />
      </IonButton>
      <IonModal
        ref={modal}
        trigger="add-facility-btn"
        className="add-facility-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Select a facility to build</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={handleConfirm} disabled={!type}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {items.map((i) => (
              <FacilityCard
                key={i.name}
                type={i.name}
                onSelect={() => setType(i.name)}
                selected={i.name == type}
              />
            ))}
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddFacilityButton;
