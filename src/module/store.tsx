import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers.tsx';

const store = configureStore({ reducer: rootReducer });

export default store;
