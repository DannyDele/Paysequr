import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_ENDPOINT = 'https://secure.paysequr.com';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsInVzZXJJZCI6MiwiaWF0IjoxNzE4NTkzODI4LCJleHAiOjE3MTkxOTg2Mjh9.WIfNpLaloW6V0rrPCdgQjP-6up3ttrLGCTxkjgfo0iA';



// Thunk function to fetch all escrow from the API endpoint
export const fetchAllEscrow = createAsyncThunk(
  'escrow/fetchAllEscrow',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/api-escrow/get-all-escrow`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transactions = response.data;
      console.log('Transaction Response:', transactions);


      return transactions;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response);
        return rejectWithValue(error.response.data.msg);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        return rejectWithValue('No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
        return rejectWithValue('Request setup error.');
      }
    }
  }
);

// Slice for handling escrow state
const escrowSlice = createSlice({
  name: 'escrow',
  initialState: {
    escrow: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEscrow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEscrow.fulfilled, (state, action) => {
        state.loading = false;
        state.escrow = action.payload;
      })
      .addCase(fetchAllEscrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the slice reducer
export default escrowSlice.reducer;
