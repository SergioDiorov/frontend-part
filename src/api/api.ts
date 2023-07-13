import axios from 'axios';
import { UserSignUpType, UserSignInType } from '../types/types';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export type SignUpUserType = {
  code: number;
  message: string;
  userId?: string;
};

export const userAuthApi = {
  signUp(userCredentials: UserSignUpType) {
    return instance.post<SignUpUserType>('authUser/signup', userCredentials);
  },
  signIn(userCredentials: UserSignInType) {
    return instance.post<SignUpUserType>('authUser/signin', userCredentials);
  },
};
