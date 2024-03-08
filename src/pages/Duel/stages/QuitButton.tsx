import { IonAlert, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { exit } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { duelEnded } from "../store/duelSlice";
import { selectIsMyTurn } from "../store/selectors";

const QuitButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMyTurn = useAppSelector(selectIsMyTurn);

  return (
    <>
      <IonAlert
        trigger="fab-quit-btn"
        header="Quit"
        message="Are you sure?"
        buttons={[
          {
            text: "Yes",
            handler() {
              dispatch(duelEnded());
            },
          },
        ]}
      ></IonAlert>
      <IonFab horizontal="start" vertical="bottom">
        <IonFabButton color="danger" id="fab-quit-btn" disabled={!isMyTurn}>
          <IonIcon icon={exit} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default QuitButton;
