export type UserDataResponseType = {
  _id: string;
  userName: string;
  email: string;
  admin: boolean;
};

export type UserResponseType = {
  message: string;
  user: UserDataResponseType;
};

export type AllUsersResponseType = {
  message: string;
  users: Array<UserDataResponseType>;
};
