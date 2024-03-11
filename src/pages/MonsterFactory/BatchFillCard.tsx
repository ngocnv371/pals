import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
} from "@ionic/react";
import { play, stop } from "ionicons/icons";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { startBatchFill, aborted, selectProgress } from "./factorySlice";
import { selectUnfilledCount } from "./beastiarySlice";

const BatchFillCard: React.FC = () => {
  const { completed, total } = useAppSelector(selectProgress);
  const [playing, setPlaying] = useState(false);
  const [batchSize, setBatchSize] = useState(1);
  const dispatch = useAppDispatch();
  const percentage = total ? completed / total : 0;

  const handleStart = useCallback(() => {
    setPlaying(true);
    dispatch(aborted(false));
    setTimeout(
      () =>
        dispatch(
          startBatchFill(() => {
            setPlaying(false);
          })
        ),
      100
    );
  }, [playing, batchSize]);

  const handleStop = useCallback(() => dispatch(aborted(true)), []);

  return (
    <IonCard className="batch-fill-card">
      <IonProgressBar value={percentage} />
      <IonCardHeader>
        <IonCardTitle>
          Batch Fill Monsters {completed}/{total}
        </IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonInput label="Batch Size" value={batchSize} type="number" />
        </IonItem>
      </IonList>
      <IonButton fill="clear" disabled={playing} onClick={handleStart}>
        <IonIcon slot="start" icon={play} />
        Start
      </IonButton>
      <IonButton fill="clear" disabled={!playing} onClick={handleStop}>
        <IonIcon slot="start" icon={stop} />
        Stop
      </IonButton>
    </IonCard>
  );
};

export default BatchFillCard;
