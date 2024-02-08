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
import { useAppSelector } from "../store/hooks";
import { selectAllBases } from "../store/basesSlice";
import { selectActiveBaseId } from "../store/uiSlice";
import CreateBaseButton from "./CreateBaseButton";

const BasesList: React.FC = () => {
  const bases = useAppSelector((state) => selectAllBases(state.bases));
  const activeBaseId = useAppSelector((state) => selectActiveBaseId(state));

  return (
    <IonList id="base-list">
      <IonListHeader>Bases</IonListHeader>
      {bases.map((base) => {
        return (
          <IonMenuToggle key={base.id} autoHide={true}>
            <IonItem
              className={activeBaseId == base.id ? "selected" : ""}
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
      <CreateBaseButton />
    </IonList>
  );
};

export default BasesList;
