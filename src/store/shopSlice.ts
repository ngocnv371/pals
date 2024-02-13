import {
  createSlice,
  createEntityAdapter,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Base } from "../models/base";
import { AppDispatch, RootState } from "./store";
import Item from "../models/item";
import { Chance } from "chance";
import { entities } from "../data/metadata";
import ShopItem from "../models/ShopItem";
import inventorySlice, {
  itemAdded,
  itemDeducted,
  selectGold,
} from "./inventorySlice";

const shopAdapter = createEntityAdapter<ShopItem>();

const initialState = shopAdapter.getInitialState();

export const basesSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    set(state, action: PayloadAction<ShopItem[]>) {
      shopAdapter.removeAll(state);
      shopAdapter.addMany(state, action.payload);
    },
    update: shopAdapter.updateOne,
    remove: shopAdapter.removeOne,
  },
});

export const { selectAll: selectAllShopItems, selectById: selectShopItemById } =
  shopAdapter.getSelectors();

export const refreshShop = () => (dispatch: AppDispatch) => {
  const chance = new Chance();
  const items = entities
    .filter((e) => chance.bool())
    .map((e) => ({
      id: e.id,
      quantity: chance.natural({ min: 1, max: 10 }),
      price: chance.natural({ min: 10, max: 100 }),
    }));
  dispatch(basesSlice.actions.set(items));
};

export const buy =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const gold = selectGold(state);
    const shopItem = selectShopItemById(state.shop, id);
    if (gold < shopItem.price) {
      console.warn(`not enough balance to buy item #${shopItem.id}`);
      return;
    }

    const updatedQuantity = shopItem.quantity - 1;
    if (updatedQuantity > 0) {
      dispatch(
        basesSlice.actions.update({
          id: shopItem.id,
          changes: {
            quantity: updatedQuantity,
          },
        })
      );
    } else {
      dispatch(basesSlice.actions.remove(shopItem.id));
    }

    const item: Item = { id: shopItem.id, quantity: 1 };
    dispatch(itemAdded(item));
    dispatch(itemDeducted({ id: "gold", quantity: shopItem.price }));
    return item;
  };

export default basesSlice.reducer;
