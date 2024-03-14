import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { home } from "ionicons/icons";

const HomeButton: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonButton onClick={() => router.push("/")}>
      <IonIcon slot="start" icon={home} />
      Home
    </IonButton>
  );
};

export default HomeButton;
