import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { usersApi } from 'api/api';
import { UserDataResponseType } from 'types/apiTypes';
import { UserType } from 'types/types';

export type InitialState = {
  userData: null | UserDataResponseType;
  userProfiles: null;
  requestErrors: string | null;
};

const initialState: InitialState = {
  userData: null,
  userProfiles: null,
  requestErrors: null,
};

export const changeUserData = createAsyncThunk('currentUser/changeUserData', async ({ userId, userCredentials }: { userId: string, userCredentials: Partial<UserType> }) => {
  const response = await usersApi.changeUserData(userId, userCredentials);
  return response.data.user;
});

export const getCurrentUserById = createAsyncThunk('currentUser/getCurrentUserById', async (userId: string) => {
  const response = await usersApi.getUserById(userId);
  return response.data.user;
});

export const deleteUser = createAsyncThunk('currentUser/deleteUser', async (userId: string) => {
  const response = await usersApi.deleteUser(userId);
  return response.data.user;
});

const currentUser = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCurrentUserById.fulfilled,
      (state, action: PayloadAction<UserDataResponseType>) => {
        state.userData = action.payload;
      }
    );

    builder.addCase(
      changeUserData.fulfilled,
      (state, action: PayloadAction<UserDataResponseType>) => {
        state.userData = action.payload;
      }
    );

    builder.addCase(
      deleteUser.fulfilled,
      (state) => {
        state.userData = null;
      }
    );
  },
});

export default currentUser.reducer;
