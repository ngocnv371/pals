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
import { useAppDispatch } from "../../store/hooks";
import { batchFill, shouldStopChanged } from "./factorySlice";

const BatchFillCard: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [batchSize, setBatchSize] = useState(1);
  const dispatch = useAppDispatch();

  const handleStart = useCallback(() => {
    setPlaying(true);
    dispatch(shouldStopChanged(false));
    setTimeout(
      () =>
        dispatch(
          batchFill(() => {
            setPlaying(false);
          })
        ),
      100
    );
  }, [playing, batchSize]);

  const handleStop = useCallback(() => dispatch(shouldStopChanged(true)), []);

  return (
    <IonCard className="batch-fill-card">
      <IonProgressBar value={0.7} />
      <IonCardHeader>
        <IonCardTitle>Batch Fill Monsters 3/7</IonCardTitle>
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
