import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ProfileDataResponseType, ProfileType } from 'types/profileTypes';
import { profilesApi } from 'api/api';

export type InitialState = {
  profiles: null | ProfileDataResponseType[];
};

const initialState: InitialState = {
  profiles: null,
};

export const getUserPrifile = createAsyncThunk('profiles/getUserPrifile', async (userId: string) => {
  const response = await profilesApi.getProfiles(userId);
  return response.data.profiles;
});

export const addNewProfile = createAsyncThunk('profiles/addNewProfile', async ({ userId, userCredentials }: { userId: string, userCredentials: ProfileType }) => {
  let userCredentialsToPost = { ...userCredentials, user: userId }
  await profilesApi.addProfile(userId, userCredentialsToPost);
  await getUserPrifile(userId);
});

export const changeProfileData = createAsyncThunk('profiles/changeProfileData', async ({ userId, userCredentials }: { userId: string, userCredentials: ProfileType }) => {
  await profilesApi.changeProfileData(userId, userCredentials);
  await getUserPrifile(userId);
});

export const deleteProfile = createAsyncThunk('profiles/deleteProfile', async ({ userId, userCredentials }: { userId: string, userCredentials: ProfileType }) => {
  await profilesApi.deleteProfile(userId);
  await getUserPrifile(userId);
});

const profiles = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserPrifile.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
  },
});

export default profiles.reducer;
