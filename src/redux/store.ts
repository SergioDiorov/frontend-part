import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from 'redux/auth-reducer';

let reducers = combineReducers({ authReducer });
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type StateType = ReturnType<typeof reducers>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesType<T>>;

export default store;
