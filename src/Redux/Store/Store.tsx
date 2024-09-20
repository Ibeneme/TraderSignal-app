import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from '../Auth/Auth';
import profileReducer from '../Profile/Profile';
import subReducer from '../Subscriptions/Sub';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  sub: subReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
