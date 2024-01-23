import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface CounterSlice {
  token: string;
  isLoadind: boolean;
}

const initialState: CounterSlice = {
  token: '',
  isLoadind: false,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{token: string; isLoading: boolean}>,
    ) => {
      state.token = action.payload.token;
      state.isLoadind = action.payload.isLoading;
    },
  },
});

export const {setToken} = configSlice.actions;
export default configSlice.reducer;
