import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { key, settings } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setApiKey } from "./gptSlice";

const SetApiKeyButton: React.FC = () => {
  const apiKey = useAppSelector((state) => state.gpt.apiKey);
  const dispatch = useAppDispatch();

  function handleSubmit(value: any) {
    console.debug("submit value", value);
    if (!value.apiKey) {
      return;
    }

    dispatch(setApiKey(value.apiKey));
  }

  return (
    <>
      <IonButton id="set-api-key-btn">
        <IonIcon icon={key}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="set-api-key-btn"
        header="API KEY"
        message="Get this from the GPT provider."
        buttons={[
          {
            text: "Submit",
            handler: handleSubmit,
          },
        ]}
        inputs={[
          {
            name: "apiKey",
            placeholder: "apiKey",
            value: apiKey,
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default SetApiKeyButton;
