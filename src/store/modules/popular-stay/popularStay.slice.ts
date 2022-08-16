import { createSlice } from '@reduxjs/toolkit';
import { PopularStayType } from './popularStay.type';
import { fetchPopularStay } from '../../../api/popular-stay';

const initialState: PopularStayType = {
  stay: [
    {
      id: 0,
      name: '',
      image: '',
      content: '',
      minprice: 0,
      maxprice: 0,
      local: {
        id: 0,
        name: '',
        classification: '',
      },
      stay: {
        id: 0,
        name: '',
        classification: '',
      },
      theme: [
        {
          id: 0,
          name: '',
        },
      ],
      event: {
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
      likesCount: 0,
    },
  ],
};

export const popularStaySlice = createSlice({
  name: 'popularStay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularStay.fulfilled, (state, action) => {
      state.stay = action.payload.data;
    });
  },
});

export const popularStayAction = popularStaySlice.actions;
export default popularStaySlice.reducer;
