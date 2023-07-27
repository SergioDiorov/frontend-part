export type UserDataResponseType = {
  _id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
};

export type UserResponseType = {
  message: string;
  user: UserDataResponseType;
};

export type AllUsersResponseType = {
  message: string;
  users: UserDataResponseType[];
};
