import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import "./theme/main.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { useAppTabs } from "./modules/shared/useAppTabs";
import { arrowUpRightBox, bag, build, heart, home, paw } from "ionicons/icons";
import CagePage from "./modules/cage";
import BreedingPage from "./modules/breeding";
import InventoryPage from "./modules/inventory";
import HideoutPage from "./modules/hideout";
import { useAppStore } from "./modules/store/useAppStore";
import { useInterval } from "./modules/shared/useInterval";
import { useRef } from "react";

setupIonicReact();

const App: React.FC = () => {
  const showTabs = useAppStore((state) => state.showTabs);
  const update = useAppStore((s) => s.update);
  const timeRef = useRef(new Date().getTime());

  useInterval(() => {
    const now = new Date().getTime();
    const delta = now - timeRef.current;
    update(delta);
    timeRef.current = new Date().getTime();
  }, 1000);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/cage" />
            <Route exact path="/cage" render={() => <CagePage />} />
            <Route exact path="/breeding" render={() => <BreedingPage />} />
            <Route exact path="/inventory" render={() => <InventoryPage />} />
            <Route exact path="/hideout" render={() => <HideoutPage />} />
          </IonRouterOutlet>
          {showTabs && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="cage" href="/cage">
                <IonIcon aria-hidden="true" icon={paw} />
                <IonLabel>Cage</IonLabel>
              </IonTabButton>
              <IonTabButton tab="breeding" href="/breeding">
                <IonIcon aria-hidden="true" icon={heart} />
                <IonLabel>Breeding</IonLabel>
              </IonTabButton>
              <IonTabButton tab="inventory" href="/inventory">
                <IonIcon aria-hidden="true" icon={bag} />
                <IonLabel>Inventory</IonLabel>
              </IonTabButton>
              <IonTabButton tab="hideout" href="/hideout">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Hideout</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
