import {
  createSlice,
  createEntityAdapter,
  createSelector,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import Facility from "../models/facility";
import { AppDispatch, RootState } from "./store";
import { itemAdded } from "./inventorySlice";
import { getRecipeById, getRecipes, getRecipesByFacility } from "../data/recipes";
import { getFacilityType } from "../data/facilities";

const facilitiesAdapter = createEntityAdapter<Facility>();

const fa0: Facility = {
  id: nanoid(),
  type: "Logging Site",
  baseId: "default",
  activeRecipeId: "lumber_mill_wood",
};

const initialState = facilitiesAdapter.getInitialState({
  entities: {
    [fa0.id]: fa0,
  },
  ids: [fa0.id],
});

export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    added: facilitiesAdapter.addOne,
    recipeSelected(
      state,
      action: PayloadAction<{ facilityId: string; recipeId: string }>
    ) {
      facilitiesAdapter.updateOne(state, {
        id: action.payload.facilityId,
        changes: {
          activeRecipeId: action.payload.recipeId,
        },
      });
    },
  },
});

export const {
  selectAll: selectAllFacilities,
  selectById: selectFacilityById,
} = facilitiesAdapter.getSelectors();

export const selectFacilitiesByBaseId = createSelector(
  [selectAllFacilities, (_, baseId: string) => baseId],
  (facilities, baseId) => {
    return facilities.filter((f) => f.baseId === baseId);
  }
);

export const { recipeSelected } = facilitiesSlice.actions;

export const facilityCreated =
  (type: string, baseId: string) => (dispatch: AppDispatch) => {
    const recipes = getRecipesByFacility(type)
    dispatch(
      facilitiesSlice.actions.added({
        id: nanoid(),
        type,
        baseId,
        activeRecipeId: recipes?.length == 1 ? recipes[0].id : undefined
      })
    );
  };

export const worked =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const facility = selectFacilityById(getState().facilities, id);
    if (!facility.activeRecipeId) {
      console.warn("worked on a station with no active recipe");
      return;
    }

    const recipe = getRecipeById(facility.activeRecipeId);
    const produce = recipe.produce as any;
    const products = Object.keys(produce).map((k) => ({
      id: k,
      quantity: +produce[k],
    }));
    products.forEach((p) => dispatch(itemAdded(p)));
    return products;
  };

export default facilitiesSlice.reducer;
