import { AxiosResponse } from 'axios';

import authReducer, {
  signInUserTh,
  signUpUserTh,
  InitialState,
} from 'redux/auth-reducer';
import { AuthResponseType, userAuthApi } from 'api/api';

jest.mock('api/api');
const userAuthApiMock = userAuthApi as jest.Mocked<typeof userAuthApi>;

beforeEach(() => {
  userAuthApiMock.signUp.mockClear();
  userAuthApiMock.signIn.mockClear();
});

const initialState: InitialState = {
  userId: null,
  requestErrors: null,
  isLoading: false,
};

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
} as unknown as AxiosResponse<AuthResponseType, any>;

userAuthApiMock.signUp.mockResolvedValue(result);
userAuthApiMock.signIn.mockResolvedValue(result);

test('should return an empty initial state', () => {
  const result = authReducer(undefined, { type: '' });

  const initialState = {
    userId: null,
    requestErrors: null,
    isLoading: false,
  };

  expect(result).toEqual(initialState);
});

test('signUpUserTh thunk should maske a success dispatch', async () => {
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

  const dispatch = jest.fn();
  await thunk(dispatch, () => ({}), {});

  const { calls } = dispatch.mock;
  expect(calls).toHaveLength(2);

  const [start, end] = calls;

  expect(start[0].type).toBe('auth/signUpUser/pending');
  expect(end[0].type).toBe('auth/signUpUser/fulfilled');
  expect(end[0].payload).toEqual(responseData);
});

test('signInUserTh thunk should maske a success dispatch', async () => {
  const thunk = signInUserTh({
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

  const dispatch = jest.fn();
  await thunk(dispatch, () => ({}), {});

  const { calls } = dispatch.mock;
  expect(calls).toHaveLength(2);

  const [start, end] = calls;

  expect(start[0].type).toBe('auth/signInUser/pending');
  expect(end[0].type).toBe('auth/signInUser/fulfilled');
  expect(end[0].payload).toEqual(responseData);
});

test('SIGN_UP action should return userId', () => {
  const data = {
    user: {
      email: 'test@gmail.com',
      id: 'test123',
    },
    message: 'SUCCESS',
  };

  const action = {
    type: signUpUserTh.fulfilled.type,
    payload: data,
  };
  const newState = authReducer(initialState, action);

  expect(newState.userId).toBe(data.user.id);
  expect(newState.requestErrors).toBe(null);
});

test('SIGN_UP action should return error message', () => {
  const data = {
    message: 'Email is already registered',
  };

  const action = {
    type: signUpUserTh.fulfilled.type,
    payload: data,
  };
  const newState = authReducer(initialState, action);

  expect(newState.userId).toBe(null);
  expect(newState.requestErrors).toBe(data.message);
});

test('SIGN_IN action should return userId', () => {
  const data = {
    user: {
      email: 'test@gmail.com',
      id: 'userId',
    },
    message: 'SUCCESS',
  };

  const action = {
    type: signInUserTh.fulfilled.type,
    payload: data,
  };
  const newState = authReducer(initialState, action);

  expect(newState.userId).toBe(data.user.id);
  expect(newState.requestErrors).toBe(null);
});

test('SIGN_IN action should return error message', () => {
  const data = {
    message: 'Wrong email',
  };

  const action = {
    type: signInUserTh.fulfilled.type,
    payload: data,
  };
  const newState = authReducer(initialState, action);

  expect(newState.userId).toBe(null);
  expect(newState.requestErrors).toBe(data.message);
});
