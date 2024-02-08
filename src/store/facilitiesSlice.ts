import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
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
    worked(state, action: PayloadAction<string>) {
      const fac = selectFacilityById(state, action.payload);
    },
  },
});

export const {
  selectAll: selectAllFacilities,
  selectById: selectFacilityById,
} = facilitiesAdapter.getSelectors();

export const selectFacilitiesByBaseId = createSelector(
  [selectAllFacilities, (_, baseId: string) => baseId],
  (facilities, baseId) => facilities.filter((f) => f.baseId == baseId)
);

export const worked = (facilityId: string) => (dispatch: AppDispatch) => {
  dispatch(itemAdded({ id: "stone", quantity: 1 }));
  dispatch(itemAdded({ id: "wood", quantity: 1 }));
};

export default facilitiesSlice.reducer;
