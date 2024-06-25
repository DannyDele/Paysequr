// ./redux/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ENDPOINT = 'https://secure.paysequr.com';

// Function to fetch all users
export const adminLogin = createAsyncThunk(
  'admin/adminLogin',
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/api-admin/login`, form);
      console.log('Admin coming from thunk:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error logging in admin:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = false;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload.msg || 'An unknown error occurred';
      });
  },
});

export default loginSlice.reducer;
