import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import "./Menu.css";
import BasesList from "./BasesList";

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <BasesList />
        <IonList>
          <IonListHeader>Others</IonListHeader>
          <IonMenuToggle>
            <IonItem routerLink="/my-pals">
              <IonLabel>My Pals</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
