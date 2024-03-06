import { IonAlert, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { exit } from "ionicons/icons";
import { useAppDispatch } from "../../../store/hooks";
import { duelEnded } from "../duelSlice";

const QuitButton: React.FC = () => {
  const dispatch = useAppDispatch();

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
        <IonFabButton color="danger" id="fab-quit-btn">
          <IonIcon icon={exit} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default QuitButton;
