import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useCallback, useState } from "react";
import "./styles.css";
import { DECK_SIZE } from "./model";
import CardFlavor from "../../components/Card/CardFlavor";
import CardToolbar from "./CardToolbar";
import { useAppSelector } from "../../store/hooks";
import { selectFiltered, selectTotal } from "./deckSlice";
import { arrowForward } from "ionicons/icons";
import Filter from "../../models/filter";
import { GridItem } from "../../components/Grid/GridItem";
import FilterButton from "../Book/FilterButton";

const defaultFilter = {
  query: "",
  asc: true,
  sort: "name",
};

const DeckPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [selected, setSelected] = useState<(typeof filtered)["items"][0]>();
  const total = useAppSelector(selectTotal);
  const filtered = useAppSelector(selectFiltered(filter));

  const toggle = useCallback(
    (item: typeof selected) =>
      setSelected((old) => (old?.id == item?.id ? undefined : item)),
    []
  );

  const handleFilterChanged = useCallback((value: Filter) => {
    setFilter(value);
    console.debug("filter updated", value);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            Deck ({total}/{DECK_SIZE})
          </IonTitle>
          <IonButtons slot="end">
            <FilterButton value={filter} onChange={handleFilterChanged} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="deck-grid">
          {filtered.items.map((item) => (
            <GridItem
              key={item.bookId}
              id={item.bookId}
              type={item.id}
              selected={item.bookId == selected?.bookId}
              onClick={() => toggle(item)}
            />
          ))}
        </div>
      </IonContent>

      {Boolean(selected) && (
        <IonFooter>
          <CardToolbar bookId={selected!.bookId} />
          <CardFlavor cardId={selected!.id} />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default DeckPage;
