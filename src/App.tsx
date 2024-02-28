import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
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
import BasePage from "./pages/Base";
import MyPalsPage from "./pages/MyPals";
import { Provider } from "react-redux";
import { store } from "./store";
import InventoryPage from "./pages/Inventory";
import DeckPage from "./pages/Deck";

setupIonicReact();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/deck" />
              </Route>
              <Route path="/bases/:id" exact={true}>
                <BasePage />
              </Route>
              <Route path="/my-pals" exact={true}>
                <MyPalsPage />
              </Route>
              <Route path="/inventory" exact={true}>
                <InventoryPage />
              </Route>
              <Route path="/deck" exact={true}>
                <DeckPage />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
