import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const TestsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tests</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Fusion</IonListHeader>
          <IonItem routerLink="/tests/fusion-failed">
            <IonLabel>Fusion Failed</IonLabel>
          </IonItem>
          <IonItem routerLink="/tests/fusion-ok">
            <IonLabel>Fusion OK</IonLabel>
          </IonItem>
          <IonItem routerLink="/tests/battle">
            <IonLabel>Battle</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TestsPage;
