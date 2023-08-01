export type UserType = {
  userName: string;
  email: string;
  isAdmin?: boolean;
};

export type UserSignUpType = UserType & {
  password: string;
};

export type UserSignInType = {
  email: string;
  password: string;
};

export type responseErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};
