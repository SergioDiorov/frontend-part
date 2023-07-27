export type UserSignUpType = {
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
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
