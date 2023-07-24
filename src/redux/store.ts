import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth-reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
