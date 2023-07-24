import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { SignUpUserType, userAuthApi } from 'api/api';
import { UserSignInType, UserSignUpType, responseErrorType } from 'types/types';

export type InitialState = {
  userId: string | null;
  requestErrors: string | null;
};

const initialState: InitialState = {
  userId: null,
  requestErrors: null,
};

type SignActionType = Pick<SignUpUserType, 'message' | 'user'>;

export const signUpUserTh = createAsyncThunk(
  'auth/signUpUser',
  async (userCredentials: UserSignUpType) => {
    try {
      const response = await userAuthApi.signUp(userCredentials);
      return response.data;
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      console.log(errorResponse);
      return errorResponse.response.data;
    }
  }
);

export const signInUserTh = createAsyncThunk(
  'auth/signInUser',
  async (userCredentials: UserSignInType) => {
    try {
      const response = await userAuthApi.signIn(userCredentials);
      return response.data;
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      return errorResponse.response.data;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      signUpUserTh.fulfilled,
      (state, action: PayloadAction<SignActionType>) => {
        state.userId = action.payload.user?.id || null;
        state.requestErrors =
          action.payload.message === 'SUCCESS' ? null : action.payload.message;
      }
    );
    builder.addCase(
      signInUserTh.fulfilled,
      (state, action: PayloadAction<SignActionType>) => {
        state.userId = action.payload.user?.id || null;
        state.requestErrors =
          action.payload.message === 'SUCCESS' ? null : action.payload.message;
      }
    );
  },
});

export default authSlice.reducer;
