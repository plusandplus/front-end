import { createSlice } from '@reduxjs/toolkit';

import { getStay, getRoom } from '../../../api/stay';
import { StayType } from './stay.type';

const initialState: StayType = {
  stayData: {
    id: 0,
    name: '',
    image: '',
    content: '',
    address: '',
    minprice: 0,
    maxprice: 0,
    x: '',
    y: '',
    local_id: {
      id: 1,
      name: '',
      classification: '',
    },
    stay_id: {
      id: 0,
      name: '',
      classification: '',
    },
    themes: [
      {
        id: 0,
        name: '',
      },
    ],
    event_id: {
      id: 0,
      name: '',
      start_date: '',
      end_date: '',
      rate: 0,
    },
    likes: [
      {
        id: 0,
        station_id: 0,
        user_id: 0,
      },
    ],
    rooms: [
      {
        id: 0,
        name: '',
        image: '',
        content: '',
        price: 0,
        max_cnt: 0,
        created_at: '',
        updated_at: '',
      },
    ],
  },

  roomData: {
    id: 0,
    name: '',
    image: '',
    content: '',
    price: 0,
    max_cnt: 0,
    checkin_time: '',
    checkout_time: '',
    created_at: '',
    updated_at: '',
    station: {
      id: 0,
      name: '',
      image: '',
      content: '',
      minprice: 0,
      maxprice: 0,
      address: '',
      x: '',
      y: '',
      status: '',
      created_at: '',
      updated_at: '',
    },
  },
};

export const staySlice = createSlice({
  name: 'stay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStay.fulfilled, (state, action) => {
        state.stayData = action.payload.data;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.roomData = action.payload.data;
      });
  },
});

export const stayAction = staySlice.actions;
export default staySlice.reducer;
