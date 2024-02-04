import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuToggle,
} from "@ionic/react";

import { home } from "ionicons/icons";
import "./Menu.css";
import { useContext } from "react";
import AppContext from "./AppContext/Context";

const BasesList: React.FC = () => {
  const data = useContext(AppContext)!;
  const hasBases = data && data.bases.length > 0;
  if (!hasBases) {
    return null;
  }

  return (
    <IonList id="base-list">
      <IonListHeader>Bases</IonListHeader>
      {data.bases.map((base) => {
        return (
          <IonMenuToggle key={base.id} autoHide={true}>
            <IonItem
              className={data.selectedBaseId == base.id ? "selected" : ""}
              routerLink={`/bases/${base.id}`}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon aria-hidden="true" slot="start" md={home} />
              <IonLabel>{base.name}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        );
      })}
    </IonList>
  );
};

export default BasesList;
