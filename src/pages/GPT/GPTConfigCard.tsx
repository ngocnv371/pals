import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { adapters } from "./model";
import { setAdapter, setApiKey } from "./gptSlice";

const GPTConfigCard: React.FC = () => {
  const adapter = useAppSelector((state) => state.gpt.adapter);
  const apiKey = useAppSelector((state) => state.gpt.apiKey);
  const dispatch = useAppDispatch();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>GPT Configuration</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonSelect
            label="Provider"
            value={adapter}
            onIonChange={(evt) => dispatch(setAdapter(evt.detail.value))}
          >
            {adapters.map((a) => (
              <IonSelectOption value={a}>{a}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput
            value={apiKey}
            label="API Key"
            onIonChange={(evt) => dispatch(setApiKey(evt.detail.value!))}
            clearInput
          />
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default GPTConfigCard;
