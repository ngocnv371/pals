import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectProgress,
  sessionAborted,
  startSession,
} from "./visualizerSlice";
import { useCallback, useState } from "react";
import { play, stop } from "ionicons/icons";

const BatchVisualizerCard: React.FC = () => {
  const { completed, total } = useAppSelector(selectProgress);
  const isAborted = useAppSelector((state) => state.visualizer.aborted);
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);

  const handleStart = useCallback(() => {
    setPlaying(true);
    setTimeout(
      () =>
        dispatch(
          startSession(() => {
            console.debug("done");
            setPlaying(false);
          })
        ),
      100
    );
  }, [playing]);

  const handleStop = useCallback(() => dispatch(sessionAborted()), []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          Batch Visualizer {completed}/{total}
        </IonCardTitle>
      </IonCardHeader>
      <IonButton fill="clear" disabled={playing} onClick={handleStart}>
        <IonIcon slot="start" icon={play} />
        Start
      </IonButton>
      <IonButton
        fill="clear"
        disabled={!playing || isAborted}
        onClick={handleStop}
      >
        <IonIcon slot="start" icon={stop} />
        Stop
      </IonButton>
      {isAborted && (
        <IonButton disabled fill="clear" color="danger">
          Aborted
        </IonButton>
      )}
    </IonCard>
  );
};

export default BatchVisualizerCard;
