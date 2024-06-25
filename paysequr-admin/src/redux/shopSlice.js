import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_ENDPOINT = 'https://secure.paysequr.com';

// Thunk function to fetch all shop from the API endpoint
export const fetchAllShop = createAsyncThunk(
  'shop/fetchAllShop',
  async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/api-escrow/stores`);
      console.log('All Store Item Added:', response.data);
      return response.data;
    } catch (error) {
      // Handle the error here and return a rejected value
      throw error; // This will be handled in the `rejected` case in the slice
    }
  }
);




// Thunk function to fetch a specific store
export const fetchAShop = createAsyncThunk(
  'shop/fetchAShop',
  async (storeid) => {
    const response = await axios.get(`${API_ENDPOINT}/api-escrow/storeItems/${storeid}`);
    console.log('All Product Items Fetched:', response.data);
    return response.data;
  }
);





// Thunk function to verify a store from the API endpoint
export const verifyShop = createAsyncThunk(
  'shop/verifyShop',
  async (storeid) => {
    // Approval payload to be sent on request
    const data = {
      status: 'verified'
    };

    try {
      const response = await axios.post(`${API_ENDPOINT}/api-admin/stores/${storeid}`, data);
      return response.data;
    } catch (error) {
      // Handle the error here and return a rejected value
      throw error; // This will be handled in the `rejected` case in the slice
    }
  }
);

// Thunk function to verify a store from the API endpoint
export const rejectShop = createAsyncThunk(
  'shop/verifyShop',
  async (storeid) => {
    // Approval payload to be sent on request
    const data = {
      status: 'rejected'
    };

    try {
      const response = await axios.post(`${API_ENDPOINT}/api-admin/stores/${storeid}`, data);
      return response.data;
    } catch (error) {
      // Handle the error here and return a rejected value
      throw error; // This will be handled in the `rejected` case in the slice
    }
  }
);


// Slice for handling items state
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shop: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload;
      })
      .addCase(fetchAllShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     .addCase(fetchAShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload.items;
      })
      .addCase(fetchAShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Note: Do not handle verifyShop cases here to avoid mutating the state
  },
});

// Export the slice reducer
export default shopSlice.reducer;
