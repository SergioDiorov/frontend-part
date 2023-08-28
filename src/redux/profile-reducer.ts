import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ProfileCredentialsType, ProfileDataResponseType } from 'types/profileTypes';
import { profilesApi } from 'api/api';

export type InitialState = {
  profiles: null | ProfileDataResponseType[];
  areProfilesChanged: boolean,
  isProfileFulfilled: boolean,
  isOutcome: boolean,
  searchList: null | string[],
};

const initialState: InitialState = {
  profiles: null,
  areProfilesChanged: false,
  isProfileFulfilled: false,
  isOutcome: false,
  searchList: null,
};

export const getUserProfile = createAsyncThunk('profiles/getUserProfile', async (userId: string) => {
  const response = await profilesApi.getProfiles(userId);
  return response.data.profiles;
});

export const addNewProfile = createAsyncThunk('profiles/addNewProfile', async ({ userId, profileCredentials }: { userId: string, profileCredentials: ProfileCredentialsType }) => {
  await profilesApi.addProfile(userId, profileCredentials);
});

export const changeProfileData = createAsyncThunk('profiles/changeProfileData', async ({ profileId, profileCredentials }: { profileId: string, profileCredentials: Partial<ProfileCredentialsType> }) => {
  await profilesApi.changeProfileData(profileId, profileCredentials);
});

export const deleteProfile = createAsyncThunk('profiles/deleteProfile', async (profileId: string) => {
  await profilesApi.deleteProfile(profileId);
});

export const getProfilesByName = createAsyncThunk('profiles/getProfilesByName', async ({ userId, name }: { userId: string, name: string }) => {
  const response = await profilesApi.getProfilesByName(userId, name);
  return response.data.profiles;
});

export const getAdultProfiles = createAsyncThunk('profiles/getAdultProfiles', async (userId: string) => {
  const response = await profilesApi.getAdultProfiles(userId);
  return response.data.profiles;
});

export const getProfilesByCountry = createAsyncThunk('profiles/getProfilesByCountry', async ({ userId, country }: { userId: string, country: string }) => {
  const response = await profilesApi.getProfilesByCountry(userId, country);
  return response.data.profiles;
});

export const getProfilesByCity = createAsyncThunk('profiles/getProfilesByCity', async ({ userId, city }: { userId: string, city: string }) => {
  const response = await profilesApi.getProfilesByCity(userId, city);
  return response.data.profiles;
});

export const getCountriesList = createAsyncThunk('profiles/getCountriesList', async ({ userId, country }: { userId: string, country: string }) => {
  if (country.length > 1) {
    const response = await profilesApi.getCountriesList(userId, country);
    return response.data.searchList;
  }
  return null;
});

export const getCitiesList = createAsyncThunk('profiles/getCitiesList', async ({ userId, city }: { userId: string, city: string }) => {
  if (city.length > 1) {
    const response = await profilesApi.getCitiesList(userId, city);
    return response.data.searchList;
  }
  return null;
});

const profiles = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    resetProfileAdded(state) {
      state.areProfilesChanged = false;
    },
    resetOutcome(state) {
      state.isOutcome = false;
    },
    emptySearchList(state) {
      state.searchList = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserProfile.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
    builder.addCase(
      addNewProfile.fulfilled,
      (state) => {
        state.areProfilesChanged = true;
        state.isProfileFulfilled = true;
        state.isOutcome = true;
      }
    );
    builder.addCase(
      addNewProfile.rejected,
      (state) => {
        state.isOutcome = true;
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
        state.isProfileFulfilled = true;
        state.isOutcome = true;
      }
    );
    builder.addCase(
      changeProfileData.rejected,
      (state) => {
        state.isOutcome = true;
      }
    );
    builder.addCase(
      getProfilesByName.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
    builder.addCase(
      getAdultProfiles.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
    builder.addCase(
      getProfilesByCountry.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
    builder.addCase(
      getProfilesByCity.fulfilled,
      (state, action: PayloadAction<ProfileDataResponseType[]>) => {
        state.profiles = action.payload;
      }
    );
    builder.addCase(
      getCountriesList.fulfilled,
      (state, action: PayloadAction<string[] | null>) => {
        if (!action.payload?.length) {
          state.searchList = null;
        } else {
          state.searchList = action.payload;
        }
      }
    );
    builder.addCase(
      getCitiesList.fulfilled,
      (state, action: PayloadAction<string[] | null>) => {
        if (!action.payload?.length) {
          state.searchList = null;
        } else {
          state.searchList = action.payload;
        }
      }
    );
  },
});

export const { resetProfileAdded, emptySearchList, resetOutcome } = profiles.actions;

export default profiles.reducer;
