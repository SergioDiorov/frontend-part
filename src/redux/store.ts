import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth-reducer';
import signedUserReducer from 'redux/signed-user-reducer';
import usersPageReducer from 'redux/users-page-reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    signedUser: signedUserReducer,
    users: usersPageReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
