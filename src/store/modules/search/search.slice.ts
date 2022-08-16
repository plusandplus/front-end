import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLocal,
  fetchStayType,
  fetchTheme,
  getSearchResult,
} from '../../../api/search';
import { SearchStateType } from './search.typs';

const initialState: SearchStateType = {
  local: [
    {
      id: 0,
      name: '',
      classification: '',
    },
  ],
  stayType: [
    {
      id: 0,
      name: '',
      classification: '',
    },
  ],
  theme: [
    {
      id: 0,
      name: '',
    },
  ],
  searchRegion: {
    id: 0,
    name: '',
  },
  searchCostRange: [0, 1000000],
  searchStayType: [],
  searchTheme: [],
  searchResult: {
    count: 0,
    stations: [
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
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchRegionName: (state, action) => {
      state.searchRegion = action.payload;
    },
    filterCategory: (state, action) => {
      state.searchCostRange = action.payload.cost;
      state.searchStayType = action.payload.stayType;
      state.searchTheme = action.payload.theme;
    },
    resetFilter: (state) => {
      state.searchCostRange = [0, 1000000];
      state.searchStayType = [];
      state.searchTheme = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStayType.fulfilled, (state, action) => {
        state.stayType = action.payload.data;
      })
      .addCase(fetchTheme.fulfilled, (state, action) => {
        state.theme = action.payload.data;
      })
      .addCase(fetchLocal.fulfilled, (state, action) => {
        state.local = action.payload.data;
      })
      .addCase(getSearchResult.fulfilled, (state, action) => {
        state.searchResult = action.payload.data;
      });
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
