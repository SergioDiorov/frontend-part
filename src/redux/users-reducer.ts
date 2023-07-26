import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { usersApi } from 'api/api';
import { UserDataResponseType } from 'types/apiTypes';

export type InitialState = {
  id: string | null;
  userName: string | null;
  email: string | null;
  admin: boolean | null;
};

const initialState: InitialState = {
  id: null,
  userName: null,
  email: null,
  admin: null,
};

export const getUserByIdTh = createAsyncThunk(
  'user/getUserById',
  async (id: string) => {
    const response = await usersApi.getUserById(id);
    return response.data.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserByIdTh.fulfilled,
      (state, action: PayloadAction<UserDataResponseType>) => {
        state.id = action.payload._id;
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.admin = action.payload.admin;
      }
    );
  },
});

export default userSlice.reducer;
