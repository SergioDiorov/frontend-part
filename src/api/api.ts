import axios from 'axios';
import { UserSignUpType } from '../types/types';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
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
  signIn(userCredentials: any) {
    return instance.post('authUser/signin', userCredentials);
  },
};
