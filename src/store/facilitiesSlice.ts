import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import Facility from "../models/facility";

const facilitiesAdapter = createEntityAdapter<Facility>();

const initialState = facilitiesAdapter.getInitialState();

export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {},
});

export const {
  selectAll: selectAllFacilities,
  selectById: selectFacilityById,
} = facilitiesAdapter.getSelectors();

export const selectFacilitiesByBaseId = createSelector(
  [selectAllFacilities, (_, baseId: string) => baseId],
  (facilities, baseId) => facilities.filter((f) => f.baseId == baseId)
);

export default facilitiesSlice.reducer;
