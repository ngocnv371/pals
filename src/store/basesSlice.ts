import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { Base } from "../models/base";

const basesAdapter = createEntityAdapter<Base>();

const initialState = basesAdapter.getInitialState({
  entities: {
    default: {
      id: 'default',
      name: 'Default Base'
    }
  },
  ids: ['default']
});

export const basesSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {},
});

export const { selectAll: selectAllBases, selectById: selectBaseById } =
  basesAdapter.getSelectors();

export default basesSlice.reducer;
