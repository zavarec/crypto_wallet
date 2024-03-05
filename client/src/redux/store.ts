import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coinsReducer from './slices/coinsSlice';
import stockReducer from './slices/stockSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,

    coins: coinsReducer,

    stock: stockReducer,
  },
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
