import {configureStore} from '@reduxjs/toolkit';
import leadSlice from './slices/leadSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import configSlice from './slices/configSlice';
import {leadApi} from './services/leadApi';

export const store = configureStore({
  reducer: {
    config: configSlice,
    leads: leadSlice,
    [leadApi.reducerPath]: leadApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(leadApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
