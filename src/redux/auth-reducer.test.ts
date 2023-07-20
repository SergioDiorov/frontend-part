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

const result: { data: SignUpUserType } = {
  data: {
    code: 201,
    message: 'SUCCESS',
    userId: 'test123',
  },
};

// @ts-ignore
userAuthApiMock.signUp.mockResolvedValue(result);

// @ts-ignore
userAuthApiMock.signIn.mockResolvedValue(result);

test('SIGN_UP action should return userId', () => {
  const userId = 'userId';
  const errorMessage = null;

  const newState = authReducer(
    state,
    actions.signUpUserSuccess(userId, errorMessage)
  );

  expect(newState.userId).toBe(userId);
  expect(newState.requestErrors).toBe(errorMessage);
});

test('SIGN_UP action should return error message', () => {
  const userId = null;
  const errorMessage = 'Email is already registered';

  const newState = authReducer(
    state,
    actions.signUpUserError(userId, errorMessage)
  );

  expect(newState.userId).toBe(userId);
  expect(newState.requestErrors).toBe(errorMessage);
});

test('signUpUserTh thunk should maske success dispatch', async () => {
  const thunk = signUpUserTh({
    userName: 'test',
    email: 'test@gmail.com',
    password: 'test123',
  });

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledWith(
    actions.signUpUserSuccess('test123', null)
  );
});

test('SIGN_IN action should return userId when response is success', () => {
  const userId = 'userId';
  const errorMessage = null;

  const newState = authReducer(
    state,
    actions.signInUserSuccess(userId, errorMessage)
  );

  expect(newState.userId).toBe(userId);
  expect(newState.requestErrors).toBe(errorMessage);
});

test('SIGN_IN action should return error message', () => {
  const userId = null;
  const errorMessage = 'Wrong email';

  const newState = authReducer(
    state,
    actions.signInUserError(userId, errorMessage)
  );

  expect(newState.userId).toBe(userId);
  expect(newState.requestErrors).toBe(errorMessage);
});

test('signInUserTh thunk should maske success dispatch', async () => {
  const thunk = signInUserTh({
    email: 'test@gmail.com',
    password: 'test123',
  });

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledWith(
    actions.signInUserSuccess('test123', null)
  );
});
