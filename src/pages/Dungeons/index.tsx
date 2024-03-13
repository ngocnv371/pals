import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMemo, useState } from "react";
import { getAllDungeons } from "./service";
import { play } from "ionicons/icons";
import { useAppDispatch } from "../../store/hooks";
import { Dungeon } from "./model";
import { dungeonStarted } from "../Duel/store/thunk-actions";

const DungeonsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const items = useMemo(() => getAllDungeons(), []);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const handlePlay = (item: Dungeon) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(dungeonStarted(item));
      router.push("/duel");
    }, 1200);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dungeons</IonTitle>
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate" />}
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dungeons</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {items.map((i) => (
            <IonItem
              key={i.type}
              detail
              detailIcon={play}
              onClick={() => handlePlay(i)}
            >
              <IonLabel>{i.type}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DungeonsPage;
