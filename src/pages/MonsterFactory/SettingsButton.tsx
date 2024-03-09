import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { settings } from "ionicons/icons";
import { useState } from "react";
import { setBingCookie } from "./service";

const SettingsButton: React.FC = () => {
  const [cookie, setCookie] = useState("");

  function handleSubmit(value: any) {
    console.debug("submit value", value);
    if (!value.cookie) {
      return;
    }

    setCookie(value.cookie);
    setBingCookie(value.cookie);
  }

  return (
    <>
      <IonButton id="setttings-btn">
        <IonIcon icon={settings}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="setttings-btn"
        header="Bing Cookie"
        message="Get the _U cookie from Edge."
        buttons={[
          {
            text: "Submit",
            handler: handleSubmit,
          },
        ]}
        inputs={[
          {
            name: "cookie",
            placeholder: "Cookie",
            value: cookie,
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default SettingsButton;
