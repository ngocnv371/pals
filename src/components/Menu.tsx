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

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonListHeader>Hello there</IonListHeader>
          <IonMenuToggle>
            <IonItem routerLink="/deck">
              <IonLabel>Deck</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/inventory">
              <IonLabel>Inventory</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/duel">
              <IonLabel>Duel</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/tests">
              <IonLabel>Tests</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
