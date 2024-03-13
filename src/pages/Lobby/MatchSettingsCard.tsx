import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

const MatchSettingsCard: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Match Settings</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonLabel>Region</IonLabel>
          <IonNote slot="end">Asia</IonNote>
        </IonItem>
        <IonItem>
          <IonSelect value="death" label="Mode">
            <IonSelectOption value="death">Death Match</IonSelectOption>
            <IonSelectOption value="wuss">Chicken</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect value="random" label="Deck">
            <IonSelectOption value="random">Shuffle</IonSelectOption>
            <IonSelectOption value="best">Best</IonSelectOption>
            <IonSelectOption value="bad">No Legendary</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default MatchSettingsCard;
