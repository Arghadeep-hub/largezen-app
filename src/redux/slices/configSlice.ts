import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface ConfigSliceProps {
  token: string;
  user_id: string;
}

const initialState: ConfigSliceProps = {
  token: '',
  user_id: '',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ConfigSliceProps>) => {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
  },
});

export const {setUser} = configSlice.actions;
export default configSlice.reducer;
