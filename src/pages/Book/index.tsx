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
import FilterButton from "./FilterButton";
import Filter from "../../models/filter";

const BookPage: React.FC = () => {
  const [selected, setSelected] = useState<DeckItem>();
  const [page, setPage] = useState(0);
  const total = useAppSelector(selectTotal);
  const [filter, setFilter] = useState<Filter>({
    query: "",
    asc: true,
    sort: "name",
  });
  const items = useAppSelector(selectPage(page, filter));

  const toggle = useCallback(
    (value: DeckItem) =>
      setSelected((old) => (old?.id == value.id ? undefined : value)),
    []
  );

  const handleFilterChanged = useCallback((value: Filter) => {
    setFilter(value);
    console.debug("filter updated", value);
    setPage(0);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deck ({total})</IonTitle>
          <IonButtons slot="end">
            <FilterButton value={filter} onChange={handleFilterChanged} />
          </IonButtons>
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
