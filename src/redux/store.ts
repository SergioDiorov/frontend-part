import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth-reducer';
import usersReducer from 'redux/users-reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usersReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
