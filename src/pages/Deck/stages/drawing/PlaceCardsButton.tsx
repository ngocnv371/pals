import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { myPlacingStarted } from "../../../../store/duelSlice";

const PlaceCardsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.duel.my.deploymentPlan?.selectedReservesIndices
  );

  if (!selected || !selected.length) {
    return null;
  }

  return (
    <IonFab horizontal="end" vertical="bottom">
      <IonFabButton onClick={() => dispatch(myPlacingStarted())}>
        <IonIcon icon={chevronForward} />
      </IonFabButton>
    </IonFab>
  );
};

export default PlaceCardsButton;
