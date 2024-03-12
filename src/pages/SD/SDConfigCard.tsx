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
import { setProvider, setApiKey, setUrl, setProps } from "./sdSlice";
import { useState } from "react";
import "./SDConfigCard.css";
import JsonInput from "./JsonInput";

const SDConfigCard: React.FC = () => {
  const provider = useAppSelector((state) => state.sd.provider);
  const apiKey = useAppSelector((state) => state.sd.apiKey);
  const url = useAppSelector((state) => state.sd.url);
  const props = useAppSelector((state) => state.sd.props);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  return (
    <IonCard className={`sd-config-card ${expanded ? "expanded" : ""}`}>
      <IonCardHeader onClick={() => setExpanded(!expanded)}>
        <IonCardTitle>SD Configuration</IonCardTitle>
      </IonCardHeader>
      <IonList className="list">
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
        <IonItem>
          <JsonInput value={props} onChange={(v) => dispatch(setProps(v))} />
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default SDConfigCard;
