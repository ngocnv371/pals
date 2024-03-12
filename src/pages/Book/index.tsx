import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
} from "@ionic/react";
import { useCallback, useState } from "react";
import CardFlavor from "../../components/Card/CardFlavor";
import { DeckItem } from "../Deck/model";
import { useAppSelector } from "../../store/hooks";
import { selectPage, selectTotal } from "./bookSlice";
import BookGrid from "./BookGrid";
import CardToolbar from "../Deck/CardToolbar";

const BookPage: React.FC = () => {
  const [selected, setSelected] = useState<DeckItem>();
  const [page, setPage] = useState(0);
  const total = useAppSelector(selectTotal);
  const items = useAppSelector(selectPage(page));

  const toggle = useCallback(
    (value: DeckItem) =>
      setSelected((old) => (old?.id == value.id ? undefined : value)),
    []
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deck ({total})</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <BookGrid selected={selected} onSelect={toggle} items={items} />
      </IonContent>

      {Boolean(selected) && (
        <IonFooter>
          <CardToolbar cardId={selected!.id} />
          <CardFlavor cardId={selected!.type} />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default BookPage;
