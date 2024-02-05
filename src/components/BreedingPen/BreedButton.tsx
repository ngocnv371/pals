import { IonItem, IonButton } from "@ionic/react";
import useNewPalNotification from "../NewPalNotification";
import { useContext } from "react";
import AppContext from "../AppContext/Context";

const BreedButton: React.FC<{ parent1: string; parent2: string }> = ({
  parent1,
  parent2,
}) => {
  const { breed } = useContext(AppContext)!;
  const { present } = useNewPalNotification();

  function handleClick() {
    const child = breed(parent1, parent2);
    present(child);
  }

  return (
    <>
      <IonItem disabled={!parent1 || !parent2}>
        <IonButton slot="end" onClick={handleClick}>
          Breed
        </IonButton>
      </IonItem>
    </>
  );
};

export default BreedButton;
