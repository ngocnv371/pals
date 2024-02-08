import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
  nanoid,
} from "@reduxjs/toolkit";
import Pal from "../models/pal";
import getPalMetadata from "../data/palMetadata";
import { AppDispatch, RootState } from "./store";
import breed from "../data/palBreed";
import { Chance } from "chance";
const chance = new Chance();

const palsAdapter = createEntityAdapter<Pal>();

const pal0: Pal = {
  id: nanoid(),
  type: "Cattiva",
  gender: "male",
  level: 1,
};
const pal1: Pal = {
  id: nanoid(),
  type: "Lamball",
  gender: "female",
  level: 1,
};
const initialState = palsAdapter.getInitialState({
  entities: {
    [pal0.id]: pal0,
    [pal1.id]: pal1,
  },
  ids: [pal0.id, pal1.id],
});

export const palsSlice = createSlice({
  name: "pals",
  initialState,
  reducers: {
    palAdded: palsAdapter.addOne,
  },
});

export const { selectAll: selectAllPals, selectById: selectPalById } =
  palsAdapter.getSelectors();

export const { palAdded } = palsSlice.actions;

export const breedPals =
  (parent1: string, parent2: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const x1 = selectPalById(state.pals, parent1);
    const x2 = selectPalById(state.pals, parent2);
    const p1 = getPalMetadata(x1.type);
    const p2 = getPalMetadata(x2.type);
    const childName = breed(p1.title, p2.title)!;

    const childMeta = getPalMetadata(childName);
    const child: Pal = {
      id: nanoid(),
      type: childMeta.title,
      gender: chance.pickone(["male", "female"]),
      level: 1,
    };
    dispatch(palAdded(child));
    return child;
  };

export const selectPalsByGender = createSelector(
  [selectAllPals, (_, gender) => gender],
  (pals, gender) => pals.filter((p) => p.gender == gender)
);

export default palsSlice.reducer;
