import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; // 추가
import storageSession from 'redux-persist/lib/storage/session';
import error from './error';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storageSession,
};

const rootReducer = combineReducers({ error });

export default persistReducer(persistConfig, rootReducer);
