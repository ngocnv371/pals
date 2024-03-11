import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { settings } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAdapter } from "./gptSlice";
import { adapters } from "./model";

const SelectAdapterButton: React.FC = () => {
  const adapter = useAppSelector((state) => state.gpt.adapter);
  const dispatch = useAppDispatch();

  function handleSubmit(value: any) {
    console.debug("submit value", value);
    if (!value) {
      return;
    }

    dispatch(setAdapter(value));
  }

  return (
    <>
      <IonButton id="select-adapter-btn">
        <IonIcon icon={settings}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="select-adapter-btn"
        header="Adapter"
        message="Get this from the GPT provider."
        buttons={[
          {
            text: "Submit",
            handler: handleSubmit,
          },
        ]}
        inputs={adapters.map((a) => ({
          label: a,
          type: "radio",
          value: a,
          checked: a == adapter,
        }))}
      ></IonAlert>
    </>
  );
};

export default SelectAdapterButton;
