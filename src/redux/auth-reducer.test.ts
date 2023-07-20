import { AxiosResponse } from 'axios';

import authReducer, {
  InitialState,
  actions,
  signInUserTh,
  signUpUserTh,
} from 'redux/auth-reducer';
import { SignUpUserType, userAuthApi } from 'api/api';

let state: InitialState;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
jest.mock('api/api');
const userAuthApiMock = userAuthApi as jest.Mocked<typeof userAuthApi>;

beforeEach(() => {
  state = {
    userId: null,
    requestErrors: null,
  };
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAuthApiMock.signUp.mockClear();
});

const result = {
  data: {
    code: 201,
    message: 'SUCCESS',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    user: {
      email: 'test@gmail.com',
      id: 'test123',
    },
  },
} as unknown as AxiosResponse<SignUpUserType, any>;

userAuthApiMock.signUp.mockResolvedValue(result);

userAuthApiMock.signIn.mockResolvedValue(result);

test('SIGN_UP action should return userId', () => {
  const data = {
    user: {
      email: 'test@gmail.com',
      id: 'test123',
    },
    message: 'SUCCESS',
  };

  const newState = authReducer(state, actions.signUpUser(data));

  expect(newState.userId).toBe(data.user.id);
  expect(newState.requestErrors).toBe(null);
});

test('SIGN_UP action should return error message', () => {
  const data = {
    message: 'Email is already registered',
  };
  const newState = authReducer(state, actions.signUpUser(data));

  expect(newState.userId).toBe(null);
  expect(newState.requestErrors).toBe(data.message);
});

test('signUpUserTh thunk should maske success dispatch', async () => {
  const thunk = signUpUserTh({
    userName: 'test',
    email: 'test@gmail.com',
    password: 'password',
  });

  const responseData = {
    code: 201,
    message: 'SUCCESS',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    user: {
      email: 'test@gmail.com',
      id: 'test123',
    },
  };

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledWith(actions.signUpUser(responseData));
});

test('SIGN_IN action should return userId when response is success', () => {
  const data = {
    user: {
      email: 'test@gmail.com',
      id: 'userId',
    },
    message: 'SUCCESS',
  };

  const newState = authReducer(state, actions.signInUser(data));

  expect(newState.userId).toBe(data.user.id);
  expect(newState.requestErrors).toBe(null);
});

test('SIGN_IN action should return error message', () => {
  const data = {
    message: 'Wrong email',
  };

  const newState = authReducer(state, actions.signInUser(data));

  expect(newState.userId).toBe(null);
  expect(newState.requestErrors).toBe(data.message);
});

test('signInUserTh thunk should maske success dispatch', async () => {
  const thunk = signInUserTh({
    email: 'test@gmail.com',
    password: 'password',
  });

  const data = {
    code: 201,
    message: 'SUCCESS',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    user: {
      email: 'test@gmail.com',
      id: 'test123',
    },
  };

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledWith(actions.signInUser(data));
});
