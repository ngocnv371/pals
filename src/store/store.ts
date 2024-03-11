import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./inventorySlice";
import uiSlice from "./uiSlice";
import shopSlice from "./shopSlice";
import deckSlice from "../pages/Deck/deckSlice";
import duelSlice from "../pages/Duel/store/duelSlice";
import bookSlice from "../pages/Deck/bookSlice";
import beastiarySlice from "../pages/MonsterFactory/beastiarySlice";
import gptSlice from "../pages/GPT/gptSlice";
import factorySlice from "../pages/MonsterFactory/factorySlice";
import sdSlice from "../pages/SD/sdSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    inventory: inventorySlice,
    shop: shopSlice,
    duel: duelSlice,
    deck: deckSlice,
    book: bookSlice,
    beastiary: beastiarySlice,
    gpt: gptSlice,
    sd: sdSlice,
    factory: factorySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunkAction = () => (
  dispatch: AppDispatch,
  getState: () => RootState
) => Promise<void>;
