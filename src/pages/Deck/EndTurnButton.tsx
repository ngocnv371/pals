import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { playForward } from "ionicons/icons";
import { useAppDispatch } from "../../store/hooks";
import { drawTheirCards } from "../../store/duelSlice";

const EndTurnButton: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <IonFab horizontal="end" vertical="bottom">
      <IonFabButton onClick={() => dispatch(drawTheirCards())}>
        <IonIcon icon={playForward}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default EndTurnButton;
