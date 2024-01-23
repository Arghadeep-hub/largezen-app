import {configureStore} from '@reduxjs/toolkit';
import configSlice, {CounterSlice} from './slices/configSlice';
import leadSlice, {leadSliceProps} from './leadSlice';

export interface storeStracture {
  config: CounterSlice;
  leads: leadSliceProps;
}

export const store = configureStore<storeStracture>({
  reducer: {
    config: configSlice,
    leads: leadSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
