import axios, { AxiosResponse } from 'axios';

import { UserSignUpType, UserSignInType } from 'types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export type SignUpUserType = {
  code: number;
  message: string;
  userId?: string;
};

export const userAuthApi = {
  signUp(
    userCredentials: UserSignUpType
  ): Promise<AxiosResponse<SignUpUserType>> {
    return instance.post<SignUpUserType>('authUser/signup', userCredentials);
  },
  signIn(
    userCredentials: UserSignInType
  ): Promise<AxiosResponse<SignUpUserType>> {
    return instance.post<SignUpUserType>('authUser/signin', userCredentials);
  },
};
