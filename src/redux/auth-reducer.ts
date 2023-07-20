import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { InferActionTypes, StateType } from 'redux/store';
import { SignUpUserType, userAuthApi } from 'api/api';
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

type SignActionType = Pick<SignUpUserType, 'message' | 'user'>;

export const actions = {
  authUser: (data: SignActionType) =>
    ({
      type: 'AUTH_USER',
      data,
    } as const),
};

export const signUpUserTh =
  (userCredentials: UserSignUpType): ThunkType =>
  async (dispatch: Dispatch<ReducerActionTypes>) => {
    try {
      let response = await userAuthApi.signUp(userCredentials);
      if (response.data.user) {
        dispatch(actions.authUser(response.data));
      }
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      dispatch(actions.authUser(errorResponse.response.data));
    }
  };

export const signInUserTh =
  (userCredentials: UserSignInType): ThunkType =>
  async (dispatch: Dispatch<ReducerActionTypes>) => {
    try {
      let response = await userAuthApi.signIn(userCredentials);
      if (response.data) {
        dispatch(actions.authUser(response.data));
      }
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      dispatch(actions.authUser(errorResponse.response.data));
    }
  };

const authReducer = (
  state = initialState,
  action: ReducerActionTypes
): InitialState => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        userId: action.data.user?.id || null,
        requestErrors:
          action.data.message === 'SUCCESS' ? null : action.data.message,
      };

    default:
      return state;
  }
};

export default authReducer;
