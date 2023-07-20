import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { InferActionTypes, StateType } from 'redux/store';
import { userAuthApi } from 'api/api';
import { UserSignInType, UserSignUpType, responseErrorType } from 'types/types';

let initialState = {
  userId: null as null | string,
  requestErrors: null as null | string,
};

export type InitialState = typeof initialState;

type ReducerActionTypes = InferActionTypes<typeof actions>;

type ThunkType = ThunkAction<
  Promise<void>,
  StateType,
  unknown,
  ReducerActionTypes
>;

export const actions = {
  signUpUserSuccess: (userId: string, errorMessage: null) =>
    ({
      type: 'SIGN_UP',
      userId,
      errorMessage,
    } as const),

  signUpUserError: (userId: null, errorMessage: string) =>
    ({
      type: 'SIGN_UP',
      userId,
      errorMessage,
    } as const),

  signInUserSuccess: (userId: string, errorMessage: null) =>
    ({
      type: 'SIGN_IN',
      userId,
      errorMessage,
    } as const),

  signInUserError: (userId: null, errorMessage: string) =>
    ({
      type: 'SIGN_IN',
      userId,
      errorMessage,
    } as const),
};

export const signUpUserTh =
  (userCredentials: UserSignUpType): ThunkType =>
  async (dispatch: Dispatch<ReducerActionTypes>) => {
    try {
      let response = await userAuthApi.signUp(userCredentials);
      if (response.data.userId) {
        dispatch(actions.signUpUserSuccess(response.data.userId, null));
      }
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      dispatch(
        actions.signUpUserError(null, errorResponse.response.data.message)
      );
    }
  };

export const signInUserTh =
  (userCredentials: UserSignInType): ThunkType =>
  async (dispatch: Dispatch<ReducerActionTypes>) => {
    try {
      let response = await userAuthApi.signIn(userCredentials);
      if (response.data.userId) {
        dispatch(actions.signInUserSuccess(response.data.userId, null));
      }
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      dispatch(
        actions.signInUserError(null, errorResponse.response.data.message)
      );
    }
  };

const authReducer = (
  state = initialState,
  action: ReducerActionTypes
): InitialState => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        userId: action.userId,
        requestErrors: action.errorMessage,
      };
    case 'SIGN_IN':
      return {
        ...state,
        userId: action.userId,
        requestErrors: action.errorMessage,
      };

    default:
      return state;
  }
};

export default authReducer;
