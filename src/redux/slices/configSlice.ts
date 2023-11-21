import {createSlice} from '@reduxjs/toolkit';

interface CounterSlice {
  value: number;
}

const initialState: CounterSlice = {
  value: 0,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const {increment, decrement} = configSlice.actions;
export default configSlice.reducer;
