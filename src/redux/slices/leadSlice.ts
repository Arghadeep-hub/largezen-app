import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface contact {
  _id: string;
  name: string;
  phone: string;
  lead_status: number;
  address: string;
  needed: string;
  meeting_status: number;
  meeting_date: string;
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
              item._id === action.payload.id &&
              item.meeting_status < 2 &&
              (item.meeting_status += 1),
          );
          break;

        case 'leads':
          state.collections?.map(
            item =>
              item._id === action.payload.id &&
              item.lead_status < 4 &&
              (item.lead_status += 1),
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
              item._id === action.payload.id &&
              item.meeting_status > 0 &&
              (item.meeting_status -= 1),
          );
          break;

        case 'leads':
          state.collections?.map(
            item =>
              item._id === action.payload.id &&
              item.lead_status > 0 &&
              (item.lead_status -= 1),
          );
          break;

        default:
          console.log(action.payload);
          break;
      }
    },
    addAllLeads: (state, action: PayloadAction<contact[]>) => {
      state.collections = action.payload;
    },
  },
});

export const {addLeads, increaseStatus, decreaseStatus, addAllLeads} =
  leadSlice.actions;
export default leadSlice.reducer;
