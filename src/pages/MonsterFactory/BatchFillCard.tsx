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
  IonRange,
} from "@ionic/react";
import { play, stop } from "ionicons/icons";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { startBatchFill, aborted, selectProgress } from "./factorySlice";

const BatchFillCard: React.FC = () => {
  const { completed, total } = useAppSelector(selectProgress);
  const isAborted = useAppSelector((state) => state.factory.aborted);
  const [playing, setPlaying] = useState(false);
  const [batchSize, setBatchSize] = useState(1);
  const dispatch = useAppDispatch();
  const percentage = total ? completed / total : 0;

  const handleStart = useCallback(() => {
    setPlaying(true);
    setTimeout(
      () =>
        dispatch(
          startBatchFill(batchSize, () => {
            console.debug("done");
            setPlaying(false);
          })
        ),
      100
    );
  }, [playing, batchSize]);

  const handleStop = useCallback(() => dispatch(aborted(true)), []);

  return (
    <IonCard className="batch-fill-card">
      {playing && <IonProgressBar type="indeterminate" />}
      <IonCardHeader>
        <IonCardTitle>
          Batch Fill Monsters {completed}/{total}
        </IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonRange
            labelPlacement="start"
            min={1}
            max={5}
            disabled={playing}
            pin
            snaps
            value={batchSize}
            onIonChange={(evt) => setBatchSize(+evt.detail.value!)}
          >
            <div slot="label">Batch Size</div>
          </IonRange>
        </IonItem>
      </IonList>
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

export default BatchFillCard;
