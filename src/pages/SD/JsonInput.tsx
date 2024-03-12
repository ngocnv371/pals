import { IonTextarea } from "@ionic/react";
import clsx from "clsx";
import { useState } from "react";

const validateJSON = (json: string) => {
  try {
    const data = JSON.parse(json);
    if (!data) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

const JsonInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLTextAreaElement).value;

    setIsValid(undefined);

    if (value === "") return;

    setIsValid(validateJSON(value));
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonTextarea
      className={clsx({
        "ion-valid": isValid,
        "ion-invalid": isValid === false,
        "ion-touched": isTouched,
      })}
      value={value}
      label="Props"
      labelPlacement="floating"
      autoGrow
      helperText="Enter a valid JSON"
      errorText="Invalid JSON"
      onIonInput={(event) => validate(event)}
      onIonBlur={() => markTouched()}
      onIonChange={(evt) => onChange(evt.detail.value!)}
    />
  );
};

export default JsonInput;
