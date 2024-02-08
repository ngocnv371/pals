import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import Item from "../models/item";

const inventoryAdapter = createEntityAdapter<Item>();

const initialState = inventoryAdapter.getInitialState();

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
});

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
} = inventoryAdapter.getSelectors();

export default inventorySlice.reducer;
