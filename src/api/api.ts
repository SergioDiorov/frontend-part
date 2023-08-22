import axios, { AxiosResponse } from 'axios';

import { AllUsersResponseType, UserResponseType, AuthResponseType } from 'types/apiTypes';
import { DashboardInfoResponseType } from 'types/dashboardTypes';
import { AllProfilesResponseType, ProfileResponseType, SearchListResponseType } from 'types/profileTypes';
import { UserSignUpType, UserSignInType, UserType } from 'types/types';

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
  changeUserData(userId: string, userCredentials: Partial<UserType>): Promise<AxiosResponse<UserResponseType>> {
    return instance.patch<UserResponseType>(`users/${userId}`, userCredentials);
  },
  deleteUser(userId: string) {
    return instance.delete<UserResponseType>(`users/${userId}`);
  },
};

export const profilesApi = {
  getProfiles(userId: string): Promise<AxiosResponse<AllProfilesResponseType>> {
    return instance.get<AllProfilesResponseType>(`profiles/${userId}`);
  },
  addProfile(userId: string, profileCredentials: FormData): Promise<AxiosResponse<ProfileResponseType>> {
    return instance.post<ProfileResponseType>(`profiles/${userId}`, profileCredentials, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },
  changeProfileData(profileId: string, profileData: FormData): Promise<AxiosResponse<ProfileResponseType>> {
    return instance.patch<ProfileResponseType>(`profiles/${profileId}`, profileData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },
  deleteProfile(profileId: string): Promise<AxiosResponse<ProfileResponseType>> {
    return instance.delete<ProfileResponseType>(`profiles/${profileId}`);
  },
  getProfilesByName(userId: string, name: string): Promise<AxiosResponse<AllProfilesResponseType>> {
    return instance.get<AllProfilesResponseType>(`profiles/searchByName/${userId}?profileName=${name}`);
  },
  getAdultProfiles(userId: string): Promise<AxiosResponse<AllProfilesResponseType>> {
    return instance.get<AllProfilesResponseType>(`profiles/searchAdults/${userId}`);
  },
  getProfilesByCountry(userId: string, country: string): Promise<AxiosResponse<AllProfilesResponseType>> {
    return instance.get<AllProfilesResponseType>(`profiles/searchByCountry/${userId}/${country}`);
  },
  getProfilesByCity(userId: string, city: string): Promise<AxiosResponse<AllProfilesResponseType>> {
    return instance.get<AllProfilesResponseType>(`profiles/searchByCity/${userId}/${city}`);
  },
  getCountriesList(userId: string, country: string): Promise<AxiosResponse<SearchListResponseType>> {
    return instance.get<SearchListResponseType>(`profiles/searchCountriesList/${userId}?country=${country}`);
  },
  getCitiesList(userId: string, city: string): Promise<AxiosResponse<SearchListResponseType>> {
    return instance.get<SearchListResponseType>(`profiles/searchCitiesList/${userId}?city=${city}`);
  },
};

export const dashboardApi = {
  getDashboardInfo(): Promise<AxiosResponse<DashboardInfoResponseType>> {
    return instance.get<DashboardInfoResponseType>('dashboard');
  },
}