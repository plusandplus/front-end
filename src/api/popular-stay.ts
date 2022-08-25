import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularStay = createAsyncThunk(
  'popularStay/getPopularStay',
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/stations/likes`
    );
    return response.data;
  }
);

export const getPopularStay = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/stations/likes`
  );
  return response.data;
};
