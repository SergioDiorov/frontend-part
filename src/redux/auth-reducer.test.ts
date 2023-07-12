import authReducer, {
  InitialState,
  actions,
  signUpUserTh,
} from './auth-reducer';
import { SignUpUserType, userAuthApi } from '../api/api';

let state: InitialState;

beforeEach(() => {
  state = {
    userId: null,
    requestErrors: null,
  };
});

jest.mock('../api/api');
const userAuthApiMock = userAuthApi as jest.Mocked<typeof userAuthApi>;
const result: SignUpUserType = {
  code: 201,
  message: 'SUCCESS',
  userId: 'test123',
};
// @ts-ignore
userAuthApiMock.signUp.mockReturnValue(Promise.resolve({ data: result }));

test('SIGN_UP action should return userId', () => {
  const userId = 'userId';
  const errorMessage = null;

  const newState = authReducer(state, actions.signUpUser(userId, errorMessage));

  expect(newState.userId).toBe(userId);
  expect(newState.requestErrors).toBe(errorMessage);
});

test('SIGN_UP action should return error message', () => {
  const userId = null;
  const errorMessage = 'Email is already registered';

  const newState = authReducer(state, actions.signUpUser(userId, errorMessage));

  expect(newState.userId).toBe(userId);
  expect(newState.requestErrors).toBe(errorMessage);
});

test('signUpUserTh thunk should maske success dispatch', async () => {
  const thunk = signUpUserTh({
    userName: 'test',
    email: 'test@gmail.com',
    password: 'test123',
  });
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenCalledWith(
    actions.signUpUser('test123', null)
  );
});
