import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ProfileDataResponseType, ProfileType } from 'types/profileTypes';
import { profilesApi } from 'api/api';

export type InitialState = {
  profiles: null | ProfileDataResponseType[];
  areProfilesChanged: boolean
};

const initialState: InitialState = {
  profiles: null,
  areProfilesChanged: false
};

export const getUserPrifile = createAsyncThunk('profiles/getUserPrifile', async (userId: string) => {
  const response = await profilesApi.getProfiles(userId);
  return response.data.profiles;
});

export const addNewProfile = createAsyncThunk('profiles/addNewProfile', async ({ userId, userCredentials }: { userId: string, userCredentials: ProfileType }) => {
  const userCredentialsToPost = { ...userCredentials, user: userId }
  await profilesApi.addProfile(userId, userCredentialsToPost);
});

export const changeProfileData = createAsyncThunk('profiles/changeProfileData', async ({ profileId, userCredentials }: { profileId: string, userCredentials: ProfileType }) => {
  await profilesApi.changeProfileData(profileId, userCredentials);
});

export const deleteProfile = createAsyncThunk('profiles/deleteProfile', async (profileId: string) => {
  await profilesApi.deleteProfile(profileId);
});

const profiles = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    resetProfileAdded(state) {
      state.areProfilesChanged = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserPrifile.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
    builder.addCase(
      addNewProfile.fulfilled,
      (state) => {
        state.areProfilesChanged = true;
      }
    );
    builder.addCase(
      deleteProfile.fulfilled,
      (state) => {
        state.areProfilesChanged = true;
      }
    );
    builder.addCase(
      changeProfileData.fulfilled,
      (state) => {
        state.areProfilesChanged = true;
      }
    );
  },
});

export const { resetProfileAdded } = profiles.actions;

export default profiles.reducer;
