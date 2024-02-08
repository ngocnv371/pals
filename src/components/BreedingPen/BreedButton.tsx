import { IonItem, IonButton } from "@ionic/react";
import useNewPalNotification from "../NewPalNotification";
import { useAppDispatch } from "../../store/hooks";
import { breedPals } from "../../store/palsSlice";

const BreedButton: React.FC<{ parent1: string; parent2: string }> = ({
  parent1,
  parent2,
}) => {
  const dispatch = useAppDispatch()
  const { present } = useNewPalNotification();

  function handleClick() {
    const child = dispatch(breedPals(parent1, parent2))
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
