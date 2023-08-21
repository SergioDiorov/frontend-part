import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth-reducer';
import signedUserReducer from 'redux/signed-user-reducer';
import usersPageReducer from 'redux/users-page-reducer';
import currentUserReducer from 'redux/current-user-reducer';
import profileReducer from 'redux/profile-reducer';
import dashboardSlice from './dashboard-reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    signedUser: signedUserReducer,
    users: usersPageReducer,
    currentUser: currentUserReducer,
    profile: profileReducer,
    dashboard: dashboardSlice,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
