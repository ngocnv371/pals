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
import { useAppSelector } from "../../store/hooks";
import { selectFiltered, selectTotal } from "./bookSlice";
import CardToolbar from "../Deck/CardToolbar";
import FilterButton from "./FilterButton";
import Filter from "../../models/filter";
import { VirtuosoGrid } from "react-virtuoso";
import { ItemWrapper, gridComponents } from "./grid";
import { GridItem } from "../../components/Grid/GridItem";

const defaultFilter = {
  query: "",
  asc: true,
  sort: "name",
};

const BookPage: React.FC = () => {
  const total = useAppSelector(selectTotal);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const filtered = useAppSelector(selectFiltered(filter));
  const [selected, setSelected] = useState<(typeof filtered)["items"][0]>();

  const toggle = useCallback(
    (item: typeof selected) =>
      setSelected((old) => (old?.bookId == item?.bookId ? undefined : item)),
    []
  );

  const handleFilterChanged = useCallback((value: Filter) => {
    setFilter(value);
    console.debug("filter updated", value);
  }, []);

  if (!filtered) {
    return;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            Book ({filtered.total}/{total})
          </IonTitle>
          <IonButtons slot="end">
            <FilterButton value={filter} onChange={handleFilterChanged} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <VirtuosoGrid
          style={{ height: "100%" }}
          totalCount={filtered.total}
          components={gridComponents}
          itemContent={(index) => (
            <ItemWrapper>
              <GridItem
                id={filtered.items[index].bookId}
                type={filtered.items[index].id}
                selected={filtered.items[index].bookId == selected?.bookId}
                onClick={() => toggle(filtered.items[index])}
              />
            </ItemWrapper>
          )}
        />
      </IonContent>

      {Boolean(selected) && (
        <IonFooter>
          <CardToolbar cardId={selected!.bookId} />
          <CardFlavor cardId={selected!.id} />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default BookPage;
