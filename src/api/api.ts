import axios, { AxiosResponse } from 'axios';

import { AllUsersResponseType, UserResponseType } from 'types/apiTypes';
import { UserSignUpType, UserSignInType } from 'types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      error.config &&
      !error.config._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await userAuthApi.refreshToken();
        localStorage.setItem('token', response.data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        throw error;
      }
    }
    throw error;
  }
);

export type AuthResponseType = {
  code: number;
  message: string;
  accessToken: string;
  refreshToken: string;
  user?: {
    email: string;
    id: string;
  };
};

export const userAuthApi = {
  signUp(
    userCredentials: UserSignUpType
  ): Promise<AxiosResponse<AuthResponseType>> {
    return instance.post<AuthResponseType>('authUser/signup', userCredentials);
  },
  signIn(
    userCredentials: UserSignInType
  ): Promise<AxiosResponse<AuthResponseType>> {
    return instance.post<AuthResponseType>('authUser/signin', userCredentials);
  },
  signOut(): Promise<void> {
    return instance.post('authUser/signout');
  },
  refreshToken(): Promise<AxiosResponse<AuthResponseType>> {
    return axios.get<AuthResponseType>(
      `${process.env.REACT_APP_SERVER_URL}authUser/refresh`,
      {
        withCredentials: true,
      }
    );
  },
};

export const usersApi = {
  getUsers(): Promise<AxiosResponse<AllUsersResponseType>> {
    return instance.get<AllUsersResponseType>('users');
  },
  getUserById(userId: string): Promise<AxiosResponse<UserResponseType>> {
    return instance.get<UserResponseType>(`users/${userId}`);
  },
  changeUserData(userId: string): Promise<AxiosResponse<UserResponseType>> {
    return instance.patch<UserResponseType>(`users/${userId}`);
  },
  deleteUser(userId: string) {
    return instance.delete<UserResponseType>(`users/${userId}`);
  },
};
