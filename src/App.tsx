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
import { home } from "ionicons/icons";
import CagePage from "./modules/cage";

setupIonicReact();

const App: React.FC = () => {
  const { show } = useAppTabs();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/cage" />
            <Route exact path="/cage" render={() => <CagePage />} />
          </IonRouterOutlet>
          {show && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/cage">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Cage</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
