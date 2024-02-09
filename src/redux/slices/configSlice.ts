import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserDataProps} from '../../models/common';

const initialState: UserDataProps = {
  token: '',
  user_id: '',
  user_name: '',
  user_role: 0,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataProps>) => {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.user_name = action.payload.user_name;
      state.user_role = action.payload.user_role;
    },
  },
});

export const {setUser} = configSlice.actions;
export default configSlice.reducer;
