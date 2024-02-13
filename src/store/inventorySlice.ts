import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import Item from "../models/item";
import { RootState } from "./store";

const inventoryAdapter = createEntityAdapter<Item>();

const initialState = inventoryAdapter.getInitialState({
  entities: {
    gold: {
      id: "gold",
      quantity: 400,
    },
    ["rocky egg"]: {
      id: "rocky egg",
      quantity: 3,
    },
    ["electric egg"]: {
      id: "electric egg",
      quantity: 2,
    },
  },
  ids: ["gold", "rocky egg", "electric egg"],
});

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<Item>) {
      const existed = state.entities[action.payload.id];
      if (!existed) {
        inventoryAdapter.addOne(state, action.payload);
        return;
      }

      existed.quantity += action.payload.quantity;
    },
    itemDeducted(state, action: PayloadAction<Item>) {
      const updatedQuantity =
        state.entities[action.payload.id].quantity - action.payload.quantity;
      if (updatedQuantity > 0) {
        inventoryAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            quantity: updatedQuantity,
          },
        });
      } else {
        inventoryAdapter.removeOne(state, action.payload.id);
      }
    },
  },
});

export const { selectAll: selectAllItems, selectById: selectItemById } =
  inventoryAdapter.getSelectors();

export const selectGold = (state: RootState) =>
  state.inventory.entities.gold?.quantity || 0;

export const { itemAdded, itemDeducted } = inventorySlice.actions;

export default inventorySlice.reducer;
