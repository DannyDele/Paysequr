import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_ENDPOINT = 'https://secure.paysequr.com'

// Thunk function to fetch all items from the API endpoint
export const fetchAllItems = createAsyncThunk(
  'items/fetchAllItems',
  async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/api-escrow/allitems`); // Use axios.get
      console.log('All Product Item Added:', response.data)
      return response.data; // Axios response data is already parsed JSON
    } catch (error) {
      throw error;
    }
  }
);

// Thunk function to add a new item
export const addItem = createAsyncThunk(
  'items/addItem',
  async (itemData) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/api-escrow/additem`, itemData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // Use axios.post
        console.log('New Product Item Added:', response.data)
      return response.data; // Axios response data is already parsed JSON
    } catch (error) {
      throw error;
    }
  }
);



// Thunk function to delete an item
export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (itemId) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}/api-escrow/deleteitem/${itemId}`); // Use axios.delete
      console.log('Deleted Item:', response.data)
      return response.data; // Axios response data is already parsed JSON
    } catch (error) {
      throw error;
    }
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
        state.items.push(action.payload.item); // Assuming the API returns the newly added item
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
              state.items = state.items.filter(item => item.id !== action.payload.id);

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