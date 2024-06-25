import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_ENDPOINT = 'https://secure.paysequr.com';

// Thunk function to fetch all order from the API endpoint
export const fetchAllOrder = createAsyncThunk(
  'order/fetchAllOrder',
  async (userid) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/api-escrow/get-user-escrow?userid=${userid}`);
      console.log('All Store Item Added:', response.data);
      return response.data;
    } catch (error) {
      // Handle the error here and return a rejected value
      throw error; // This will be handled in the `rejected` case in the slice
    }
  }
);



// Slice for handling items state
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      // Note: Do not handle verifyOrder cases here to avoid mutating the state
  },
});

// Export the slice reducer
export default shopSlice.reducer;
