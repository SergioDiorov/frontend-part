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

export type UserDataResponseType = {
  _id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  profileCount: number;
};

export type UserResponseType = {
  message: string;
  user: UserDataResponseType;
};

export type AllUsersResponseType = {
  message: string;
  users: UserDataResponseType[];
};
