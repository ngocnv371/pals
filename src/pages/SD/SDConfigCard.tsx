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
import { providers } from "./model";
import { setProvider, setApiKey, setUrl } from "./sdSlice";

const SDConfigCard: React.FC = () => {
  const provider = useAppSelector((state) => state.sd.provider);
  const apiKey = useAppSelector((state) => state.sd.apiKey);
  const url = useAppSelector((state) => state.sd.url);
  const dispatch = useAppDispatch();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>SD Configuration</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonSelect
            label="Provider"
            value={provider}
            onIonChange={(evt) => dispatch(setProvider(evt.detail.value))}
          >
            {providers.map((a) => (
              <IonSelectOption value={a} key={a}>
                {a}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput
            value={url}
            label="URL"
            onIonChange={(evt) => dispatch(setUrl(evt.detail.value!))}
            clearInput
            required
          />
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

export default SDConfigCard;
