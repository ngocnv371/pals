import Filter from "../../models/filter";
import Pal from "../../models/pal";
import { DeckItem, DECK_SIZE } from "../Deck/model";
import { getPalById, Sorters } from "../pals/service";

export function filterBookItems(items: DeckItem[], filter: Filter) {
  const { query, asc, sort } = filter;
  const inflatedItems = items.map((i) => ({
    ...getPalById(i.type),
    bookId: i.id,
  }));
  const lowercaseQuery = query.toLocaleLowerCase();
  const filteredItems = inflatedItems.filter(
    (i) =>
      !lowercaseQuery ||
      i.name.toLocaleLowerCase().includes(lowercaseQuery) ||
      i.description.toLocaleLowerCase().includes(lowercaseQuery)
  );
  const sorted: (Pal & { bookId: string })[] = filteredItems.sort(
    (Sorters as any)[sort]
  );
  if (!asc) {
    sorted.reverse();
  }
  const total = sorted.length;
  return {
    total,
    items: sorted,
  };
}
