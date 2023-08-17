import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { dashboardApi } from 'api/api';
import { DashboardInfoType } from 'types/dashboardTypes';

export type InitialState = {
  usersCount: null | number;
  profilesCount: null | number;
  adultProfilesCount: null | number;
};

const initialState: InitialState = {
  usersCount: null,
  profilesCount: null,
  adultProfilesCount: null,
};

export const getDashboardInfoTh = createAsyncThunk('dashboard/getDashboardInfo', async () => {
  const response = await dashboardApi.getDashboardInfo();
  return response.data.dashboardInfo;
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDashboardInfoTh.fulfilled,
      (state, action: PayloadAction<DashboardInfoType>) => {
        state.usersCount = action.payload.usersCount
        state.profilesCount = action.payload.profilesCount
        state.adultProfilesCount = action.payload.adultProfilesCount
      }
    );
  },
});

export default dashboardSlice.reducer;
