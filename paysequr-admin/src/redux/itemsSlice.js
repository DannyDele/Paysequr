import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_ENDPOINT = 'https://secure.paysequr.com'

// Thunk function to fetch all items from the API endpoint
export const fetchAllItems = createAsyncThunk(
  'items/fetchAllItems',
  async () => {
    const response = await axios.get(`${API_ENDPOINT}/api-escrow/allitems`);
    console.log('All Product Item Added:', response.data)
    return response.data;
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

// Export the slice reducer

// export const { itemDeleted } = itemsSlice.actions;
export default itemsSlice.reducer;