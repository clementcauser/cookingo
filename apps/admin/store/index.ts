import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@cookingo/auth';
import { loadingReducer } from '@cookingo/misc';

export const store = configureStore({
  reducer: {
    authReducer,
    loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
