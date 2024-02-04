import { IonItem, IonButton } from "@ionic/react";

const BreedButton: React.FC<{ parent1: string; parent2: string }> = ({
  parent1,
  parent2,
}) => {
  return (
    <>
      <IonItem disabled={!parent1 || !parent2}>
        <IonButton slot="end">Breed</IonButton>
      </IonItem>
    </>
  );
};

export default BreedButton;
