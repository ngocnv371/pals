import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useAppDispatch } from "../../store/hooks";
import { drawTheirCards } from "../../store/duelSlice";

const EndTurnButton: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <IonFab horizontal="end" vertical="bottom">
      <IonFabButton onClick={() => dispatch(drawTheirCards())}>
        <IonIcon icon={chevronForward}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default EndTurnButton;
