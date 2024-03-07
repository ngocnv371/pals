import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./inventorySlice";
import uiSlice from "./uiSlice";
import shopSlice from "./shopSlice";
import deckSlice from "../pages/Deck/deckSlice";
import duelSlice from "../pages/Duel/store/duelSlice";
import bookSlice from "../pages/Deck/bookSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    inventory: inventorySlice,
    shop: shopSlice,
    duel: duelSlice,
    deck: deckSlice,
    book: bookSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
