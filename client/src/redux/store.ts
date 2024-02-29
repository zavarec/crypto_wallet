import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import stockSlice from './slices/stockSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockSlice,
  },
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
