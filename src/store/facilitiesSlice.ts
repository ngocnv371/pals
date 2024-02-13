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
import { getRecipeById, getRecipesByFacility } from "../data/recipes";

const facilitiesAdapter = createEntityAdapter<Facility>();

const fa0: Facility = {
  id: nanoid(),
  type: "Logging Site",
  baseId: "default",
  activeRecipeId: "lumber_mill_wood",
};
const fa1: Facility = {
  id: nanoid(),
  type: "Shop",
  baseId: "default",
};

const initialState = facilitiesAdapter.getInitialState({
  entities: {
    [fa0.id]: fa0,
    [fa1.id]: fa1,
  },
  ids: [fa0.id, fa1.id],
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
    worked(
      state,
      action: PayloadAction<{ facilityId: string; work?: number }>
    ) {
      facilitiesAdapter.updateOne(state, {
        id: action.payload.facilityId,
        changes: {
          work: action.payload.work,
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
    const recipes = getRecipesByFacility(type);
    dispatch(
      facilitiesSlice.actions.added({
        id: nanoid(),
        type,
        baseId,
        activeRecipeId: recipes?.length == 1 ? recipes[0].id : undefined,
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

    const workPerTap = 12;
    const recipe = getRecipeById(facility.activeRecipeId);
    const requiredWork = recipe.ingredients.work;
    const updatedWork = (facility.work || 0) + workPerTap;
    if (updatedWork > requiredWork) {
      const produce = recipe.produce as any;
      const products = Object.keys(produce).map((k) => ({
        id: k,
        quantity: +produce[k],
      }));
      // reset work to 0, no carry over
      dispatch(
        facilitiesSlice.actions.worked({
          facilityId: id,
          work: 0,
        })
      );
      products.forEach((p) => dispatch(itemAdded(p)));
      return products;
    }

    dispatch(
      facilitiesSlice.actions.worked({ facilityId: id, work: updatedWork })
    );

    return [];
  };

export default facilitiesSlice.reducer;
