import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { Chance } from "chance";
import { DECK_SIZE, DeckItem } from "../Deck/model";
import { generateItem } from "../Deck/service";
import { AppDispatch, RootState } from "../../store";
import { addedToDeck } from "../Deck/deckSlice";
import { Sorters, getPalById } from "../pals/service";
import Pal from "../../models/pal";
import Filter from "../../models/filter";
import { filterBookItems } from "./service";
const chance = new Chance();

const adapter = createEntityAdapter<DeckItem>();

const initialState = adapter.addMany(
  adapter.getInitialState(),
  chance.n(() => generateItem(), 125)
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    added: adapter.addOne,
    removed: adapter.removeOne,
  },
});

export const {
  selectAll: selectAllBookItems,
  selectById: selectBookItemById,
  selectTotal,
} = adapter.getSelectors((state: RootState) => state.book);

// TODO: fix this double execution?
export const selectFiltered = (filter: Filter) =>
  createSelector(selectAllBookItems, (items) => filterBookItems(items, filter));

export const { added: addedToBook } = bookSlice.actions;

export const moveToDeck =
  (item: DeckItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.deck.ids.length >= DECK_SIZE) {
      console.warn(`can move more than ${DECK_SIZE} cards to deck`);
      return;
    }

    const ids = state.book.ids;
    if (!ids.includes(item.id)) {
      return;
    }

    dispatch(bookSlice.actions.removed(item.id));
    dispatch(addedToDeck(item));
  };

export default bookSlice.reducer;
