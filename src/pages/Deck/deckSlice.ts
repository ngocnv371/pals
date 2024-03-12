import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { Chance } from "chance";
import { DeckItem } from "./model";
import { generateItem } from "./service";
import { AppDispatch, RootState } from "../../store";
import { addedToBook } from "./bookSlice";

const chance = new Chance();

const adapter = createEntityAdapter<DeckItem>();

const initialState = adapter.addMany(
  adapter.getInitialState(),
  chance.n(() => generateItem(), 40)
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    added: adapter.addOne,
    removed: adapter.removeOne,
  },
});

export const { selectAll: selectAllDeckItems, selectById: selectDeckItemById } =
  adapter.getSelectors((state: RootState) => state.deck);

export const canAdd = createSelector(
  (state: RootState) => state.deck.ids,
  (ids) => ids.length < 40
);

export const { added: addedToDeck } = deckSlice.actions;

export const moveToBook =
  (item: DeckItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const ids = getState().deck.ids;
    if (!ids.includes(item.id)) {
      return;
    }

    dispatch(deckSlice.actions.removed(item.id));
    dispatch(addedToBook(item));
  };

export default deckSlice.reducer;
