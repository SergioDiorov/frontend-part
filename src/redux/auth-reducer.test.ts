import authReducer, { InitialState, actions } from './auth-reducer';

let state: InitialState;

beforeEach(() => {
  state = {
    userId: null,
    requestErrors: null,
  };
});

test('signUpUser', () => {
  const newState = authReducer(state, actions.signUpUser('qweqweqwe', null));

  expect(newState.userId).not().toBe(null);
  expect(newState.requestErrors).toBe(null);
});
