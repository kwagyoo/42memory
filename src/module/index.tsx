import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist'; // 추가
import storage from 'reduxjs-toolkit-persist/lib/storage'; // defaults to localStorage for web
import error from './error';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ error });

export default persistReducer(persistConfig, rootReducer);
