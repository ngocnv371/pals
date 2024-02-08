import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import Item from "../models/item";

const inventoryAdapter = createEntityAdapter<Item>();

const initialState = inventoryAdapter.getInitialState();

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<Item>) {
      const existed = state.entities[action.payload.id]
      if (!existed) {
        inventoryAdapter.addOne(state, action.payload)
        return
      }

      existed.quantity += action.payload.quantity
    },
  },
});

export const { selectAll: selectAllItems, selectById: selectItemById } =
  inventoryAdapter.getSelectors();

export const { itemAdded } = inventorySlice.actions;

export default inventorySlice.reducer;
