import {
  IonContent,
  IonMenu,
} from "@ionic/react";

import "./Menu.css";
import BasesList from "./BasesList";

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <BasesList />
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
