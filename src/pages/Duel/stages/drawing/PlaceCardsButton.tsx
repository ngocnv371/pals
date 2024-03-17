import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useAppDispatch } from "../../../../store/hooks";
import { actions } from "../../v2/slice";

const PlaceCardsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <IonFab horizontal="end" vertical="bottom">
      <IonFabButton
        onClick={() => dispatch(actions.endSelectingCardsForDeployment())}
      >
        <IonIcon icon={chevronForward} />
      </IonFabButton>
    </IonFab>
  );
};

export default PlaceCardsButton;
