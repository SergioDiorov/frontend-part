import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { InferActionTypes, StateType } from './store';
import { userAuthApi } from './../api/api';
import { UserSignInType, UserSignUpType } from './../types/types';

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
  signUpUser: (userId: string | null, errorMessage: string | null) =>
    ({
      type: 'SIGN_UP',
      userId,
      errorMessage,
    } as const),
  signInUser: (userId: string | null, errorMessage: string | null) =>
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
        dispatch(actions.signUpUser(response.data.userId, null));
      }
    } catch (error: any) {
      dispatch(actions.signUpUser(null, error.response.data.message));
    }
  };

export const signInUserTh =
  (userCredentials: UserSignInType): ThunkType =>
  async (dispatch: Dispatch<ReducerActionTypes>) => {
    try {
      let response = await userAuthApi.signIn(userCredentials);
      if (response.data.userId) {
        dispatch(actions.signInUser(response.data.userId, null));
      }
    } catch (error: any) {
      dispatch(actions.signInUser(null, error.response.data.message));
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
