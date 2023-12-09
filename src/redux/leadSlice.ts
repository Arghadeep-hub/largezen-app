import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface contact {
  id: string;
  name: string;
  phone: number;
  status: number;
}

export interface leadSliceProps {
  collections: contact[];
}

const initialState: leadSliceProps = {
  collections: [],
};

export const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLeads: (state, action: PayloadAction<contact>) => {
      state.collections = state.collections.concat(action.payload);
      //   console.log(action.payload);
    },
    increaseStatus: (state, action: PayloadAction<string>) => {
      state.collections?.map(
        item =>
          item.id === action.payload && item.status < 4 && (item.status += 1),
      );
    },
    decreaseStatus: (state, action: PayloadAction<string>) => {
      state.collections?.map(
        item =>
          item.id === action.payload && item.status > 0 && (item.status -= 1),
      );
    },
  },
});

export const {addLeads, increaseStatus, decreaseStatus} = leadSlice.actions;
export default leadSlice.reducer;
