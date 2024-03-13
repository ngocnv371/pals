import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { Chance } from "chance";
import { DECK_SIZE, BookItem } from "./model";
import { generateItem } from "./service";
import { AppDispatch, RootState } from "../../store";
import { addedToBook } from "../Book/bookSlice";
import Filter from "../../models/filter";
import { filterBookItems } from "../Book/service";

const chance = new Chance();

const adapter = createEntityAdapter<BookItem>();

const initialState = adapter.addMany(
  adapter.getInitialState(),
  chance.n(() => generateItem(), DECK_SIZE)
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    added: adapter.addOne,
    removed: adapter.removeOne,
  },
});

export const {
  selectAll: selectAllDeckItems,
  selectById: selectDeckItemById,
  selectTotal,
} = adapter.getSelectors((state: RootState) => state.deck);

export const canAdd = createSelector(selectTotal, (total) => total < DECK_SIZE);

export const selectFiltered = (filter: Filter) =>
  createSelector(selectAllDeckItems, (items) => filterBookItems(items, filter));

export const { added: addedToDeck } = deckSlice.actions;

export const moveToBook =
  (item: BookItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const ids = getState().deck.ids;
    if (!ids.includes(item.id)) {
      return;
    }

    dispatch(deckSlice.actions.removed(item.id));
    dispatch(addedToBook(item));
  };

export default deckSlice.reducer;
