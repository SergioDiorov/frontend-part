import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { profilesApi, usersApi } from 'api/api';
import { UserDataResponseType } from 'types/apiTypes';
import { ProfileDataResponseType } from 'types/profileTypes';
import { UserType } from 'types/types';

export type InitialState = {
  userData: null | UserDataResponseType;
  userProfiles: null | ProfileDataResponseType[];
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

export const getCurrentUserProfiles = createAsyncThunk('currentUser/getCurrentUserPrifiles', async (userId: string) => {
  const response = await profilesApi.getProfiles(userId);
  return response.data.profiles;
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

    builder.addCase(
      getCurrentUserProfiles.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.userProfiles = action.payload;
      }
    );
  },
});

export default currentUser.reducer;
