import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { Base } from "../models/base";
import { AppDispatch } from "./store";

const basesAdapter = createEntityAdapter<Base>();

const initialState = basesAdapter.getInitialState({
  entities: {
    default: {
      id: "default",
      name: "Default Base",
    },
  },
  ids: ["default"],
});

export const basesSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {
    added: basesAdapter.addOne,
  },
});

export const { selectAll: selectAllBases, selectById: selectBaseById } =
  basesAdapter.getSelectors();

export const baseCreated = (name: string) => (dispatch: AppDispatch) => {
  dispatch(
    basesSlice.actions.added({
      id: nanoid(),
      name,
    })
  );
};

export default basesSlice.reducer;
