import { IonAlert, IonItem, IonLabel } from "@ionic/react";
import { useAppDispatch } from "../store/hooks";
import { baseCreated } from "../store/basesSlice";

const CreateBaseButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: any) => {
    dispatch(baseCreated(data.name));
  };

  return (
    <>
      <IonItem id="create-base-btn">
        <IonLabel>Create new base</IonLabel>
      </IonItem>
      <IonAlert
        trigger="create-base-btn"
        header="What's the new base name?"
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

export default CreateBaseButton;
