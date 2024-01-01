import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface contact {
  id: string;
  name: string;
  phone: number;
  status: number;
  address: string;
  needed: string;
  meeting: string;
  meeting_status: number;
}

export interface leadSliceProps {
  collections: contact[];
}

export const initialState: leadSliceProps = {
  collections: [],
};

export const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLeads: (state, action: PayloadAction<contact>) => {
      state.collections = state.collections.concat(action.payload);
    },
    increaseStatus: (
      state,
      action: PayloadAction<{id: string; screen: string}>,
    ) => {
      switch (action.payload.screen) {
        case 'meeting':
          state.collections?.map(
            item =>
              item.id === action.payload.id &&
              item.meeting_status < 2 &&
              (item.meeting_status += 1),
          );
          break;

        case 'leads':
          state.collections?.map(
            item =>
              item.id === action.payload.id &&
              item.status < 4 &&
              (item.status += 1),
          );
          break;

        default:
          console.log(action.payload);
          break;
      }
    },
    decreaseStatus: (
      state,
      action: PayloadAction<{id: string; screen: string}>,
    ) => {
      switch (action.payload.screen) {
        case 'meeting':
          state.collections?.map(
            item =>
              item.id === action.payload.id &&
              item.meeting_status > 0 &&
              (item.meeting_status -= 1),
          );
          break;

        case 'leads':
          state.collections?.map(
            item =>
              item.id === action.payload.id &&
              item.status > 0 &&
              (item.status -= 1),
          );
          break;

        default:
          console.log(action.payload);
          break;
      }
    },
  },
});

export const {addLeads, increaseStatus, decreaseStatus} = leadSlice.actions;
export default leadSlice.reducer;
