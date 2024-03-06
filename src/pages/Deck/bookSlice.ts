import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { Chance } from "chance";
import { DeckItem } from "./model";
import { generateItem } from "./service";
import { AppDispatch, RootState } from "../../store";
import { addedToDeck } from "./deckSlice";
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

export const { selectAll: selectAllBookItems, selectById: selectBookItemById } =
  adapter.getSelectors((state: RootState) => state.book);

export const { added: addedToBook } = bookSlice.actions;

export const moveToDeck =
  (item: DeckItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const ids = getState().book.ids;
    if (!ids.includes(item.id)) {
      return;
    }

    dispatch(bookSlice.actions.removed(item.id));
    dispatch(addedToDeck(item));
  };

export default bookSlice.reducer;
