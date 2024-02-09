import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { useAppDispatch } from "../store/hooks";
import { baseRenamed } from "../store/basesSlice";
import { pencil } from "ionicons/icons";

const RenameBaseButton: React.FC<{ baseId: string }> = ({ baseId }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: any) => {
    dispatch(baseRenamed({ id: baseId, name: data.name }));
  };

  return (
    <>
      <IonButton id="rename-base-btn">
        <IonIcon icon={pencil} />
      </IonButton>
      <IonAlert
        trigger="rename-base-btn"
        header="What's the new name?"
        animated
        buttons={[
          {
            text: "OK",
            handler: handleSubmit,
          },
        ]}
        inputs={[
          {
            name: "name",
            placeholder: "Name",
            tabindex: 2,
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default RenameBaseButton;
