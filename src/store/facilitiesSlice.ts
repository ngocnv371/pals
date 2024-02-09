import {
  createSlice,
  createEntityAdapter,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";
import Facility from "../models/facility";
import { AppDispatch } from "./store";
import { itemAdded } from "./inventorySlice";

const facilitiesAdapter = createEntityAdapter<Facility>();

const initialState = facilitiesAdapter.getInitialState();

export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
     added: facilitiesAdapter.addOne
  },
});

export const {
  selectAll: selectAllFacilities,
  selectById: selectFacilityById,
} = facilitiesAdapter.getSelectors();

export const selectFacilitiesByBaseId = createSelector(
  [selectAllFacilities, (_, baseId: string) => baseId],
  (facilities, baseId) => {
    return facilities.filter((f) => f.baseId === baseId)
  }
);

export const facilityCreated = (type: string, baseId: string) => (dispatch: AppDispatch) => {
  dispatch(
    facilitiesSlice.actions.added({
      id: nanoid(),
      type, baseId
    })
  );
};

export const worked = (facilityId: string) => (dispatch: AppDispatch) => {
  dispatch(itemAdded({ id: "stone", quantity: 1 }));
  dispatch(itemAdded({ id: "wood", quantity: 1 }));
};

export default facilitiesSlice.reducer;
