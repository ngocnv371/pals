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
const chance = new Chance();

const adapter = createEntityAdapter<DeckItem>();

const initialState = adapter.addMany(
  adapter.getInitialState(),
  chance.n(() => generateItem(), 5)
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

export const selectPage = (page: number) =>
  createSelector(selectAllBookItems, (items) =>
    items.slice().splice(page * DECK_SIZE, DECK_SIZE)
  );

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
