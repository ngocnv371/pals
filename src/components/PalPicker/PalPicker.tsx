import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import PalsList from "./PalsList";
import PalPreview from "./PalPreview";
import "./PalPicker.css";
import PalAvatar from "./PalAvatar";
import PalLabel from "./PalLabel";
import { female, male } from "ionicons/icons";

const PalPicker: React.FC<{
  value: string;
  gender?: string;
  onSelect?: (id: string) => void;
}> = ({ gender, onSelect, value }) => {
  const [selected, setSelected] = useState(value);
  const [temp, setTemp] = useState(value);
  const modal = useRef<HTMLIonModalElement>(null);

  function openModal() {
    modal.current?.present();
  }

  function handleSelect(id: string) {
    setTemp(id);
  }

  function handleConfirm() {
    setSelected(temp);
    modal.current?.dismiss(selected, "confirm");
    onSelect && onSelect(temp);
  }

  return (
    <>
      <IonItem onClick={openModal}>
        {selected && <PalAvatar palId={selected} slot="start" />}

        {selected ? (
          <PalLabel palId={selected} />
        ) : (
          <>
            {Boolean(gender) && (
              <IonIcon icon={gender == "male" ? male : female} slot="start" />
            )}
            <IonLabel>Select a pal</IonLabel>
          </>
        )}
      </IonItem>
      <IonModal
        ref={modal}
        className="pal-picker-modal"
        onIonModalWillPresent={() => setTemp(selected)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Select pal</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={handleConfirm}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <PalsList onSelect={handleSelect} gender={gender} selected={temp} />
          <PalPreview palId={temp} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default PalPicker;
