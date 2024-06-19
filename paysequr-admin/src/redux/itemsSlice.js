import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ENDPOINT = 'https://secure.paysequr.com';

// Thunk function to fetch items from a specific store
export const fetchAllItems = createAsyncThunk(
  'items/fetchAllItems',
  async (storeid) => {
    const response = await axios.get(`${API_ENDPOINT}/api-escrow/storeItems/${storeid}`);
    console.log('All Product Items Fetched:', response.data);
    return response.data;
  }
);




// Thunk function to verify a user item from the API endpoint
export const verifyItem = createAsyncThunk(
  'shop/verifyItem',
  async (itemId) => {
    // Approval payload to be sent on request
    const data = {
       "status":"approved"
    };

    try {
      const response = await axios.post(`${API_ENDPOINT}/api-admin/edititems/${itemId}`, data);
      return response.data;
    } catch (error) {
      // Handle the error here and return a rejected value
      throw error; // This will be handled in the `rejected` case in the slice
    }
  }
);





export const addItem = createAsyncThunk(
  'items/addItem',
  async (itemData) => {
    const response = await axios.post(`${API_ENDPOINT}/api-escrow/additem`, itemData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('New Product Item Added:', response.data)
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (itemId) => {
    const response = await axios.delete(`${API_ENDPOINT}/api-escrow/deleteitems/${itemId}`);
    console.log('Deleted Item:', response.data)
    return response.data;
  }
);








// Slice for handling items state
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, action.payload.data]; // Assuming the API returns the newly added item
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
        .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming you want to keep the state items as they are after deletion
              state.items = state.items.filter(item => item.id !== action.meta.arg);

      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
