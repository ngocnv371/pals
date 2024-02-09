import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./inventorySlice";
import basesSlice from "./basesSlice";
import facilitiesSlice from "./facilitiesSlice";
import palsSlice from "./palsSlice";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    inventory: inventorySlice,
    bases: basesSlice,
    facilities: facilitiesSlice,
    pals: palsSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
