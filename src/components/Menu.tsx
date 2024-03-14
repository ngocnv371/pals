import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import "./Menu.css";
import {
  bag,
  book,
  bug,
  card,
  folder,
  home,
  location,
  play,
} from "ionicons/icons";

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/home">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/lobby">
              <IonIcon slot="start" icon={play} />
              <IonLabel>Find Match</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/deck">
              <IonIcon slot="start" icon="/icons/sword.svg" />
              <IonLabel>Deck</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/book">
              <IonIcon slot="start" icon={folder} />
              <IonLabel>Collection</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/dungeons">
              <IonIcon slot="start" icon={location} />
              <IonLabel>Dungeons</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/tests">
              <IonIcon slot="start" icon={bug} />
              <IonLabel>Tests</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
