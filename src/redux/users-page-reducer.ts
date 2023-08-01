import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { usersApi } from 'api/api';
import { UserDataResponseType } from 'types/apiTypes';

export type InitialState = {
  usersData: Array<{
    id: string | null;
    userName: string | null;
    email: string | null;
    isAdmin: boolean | null;
  }>;
};

const initialState: InitialState = {
  usersData: [],
};

export const getAllUsersTh = createAsyncThunk('user/getAllUsers', async () => {
  const response = await usersApi.getUsers();
  return response.data.users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllUsersTh.fulfilled,
      (state, action: PayloadAction<Array<UserDataResponseType>>) => {
        state.usersData = action.payload.map((user) => ({
          ...user,
          id: user._id,
        }));
      }
    );
  },
});

export default usersSlice.reducer;
