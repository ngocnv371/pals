import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { key, rocket, settings } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { classes } from "./model";
import { useState } from "react";
import { batchCreate } from "./beastiarySlice";

const BatchCreateButton: React.FC = () => {
  const [quantities, setQuantities] = useState<number[]>(classes.map((c) => 0));
  const dispatch = useAppDispatch();

  function handleSubmit(value: any) {
    console.debug("submit value", value);
    if (!value) {
      return;
    }

    const items = classes.map((c) => value[c]);
    setQuantities(items);
    dispatch(batchCreate(items));
  }

  return (
    <>
      <IonButton id="batch-create-btn">
        <IonIcon icon={rocket}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="batch-create-btn"
        header="API KEY"
        message="Specifies the quantity of each class to create."
        buttons={[
          {
            text: "Submit",
            handler: handleSubmit,
          },
        ]}
        inputs={classes.map((c, idx) => ({
          name: c,
          placeholder: c,
          type: "number",
          value: quantities[idx] || "",
        }))}
      ></IonAlert>
    </>
  );
};

export default BatchCreateButton;
