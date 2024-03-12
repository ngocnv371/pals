import Filter from "../../models/filter";
import { DeckItem, DECK_SIZE } from "../Deck/model";
import { getPalById, Sorters } from "../pals/service";

export function filterBookItems(
  items: DeckItem[],
  page: number,
  filter: Filter
) {
  const { query, asc, sort } = filter;
  const inflatedItems = items.map((i) => ({
    ...getPalById(i.type),
    bid: i.id,
  }));
  const lowercaseQuery = query.toLocaleLowerCase();
  const filteredItems = inflatedItems.filter(
    (i) =>
      !lowercaseQuery ||
      i.name.toLocaleLowerCase().includes(lowercaseQuery) ||
      i.description.toLocaleLowerCase().includes(lowercaseQuery)
  );
  const sorted = filteredItems.sort((Sorters as any)[sort]);
  if (!asc) {
    sorted.reverse();
  }
  const pagedItems = sorted.splice(page * DECK_SIZE, DECK_SIZE);
  console.debug("paged result", pagedItems);
  return pagedItems.map((p) => ({ id: p.bid, type: p.id })) as DeckItem[];
}
