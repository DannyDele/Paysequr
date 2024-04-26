import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the endpoint for both fetching and adding categories
const CATEGORIES_ENDPOINT = 'https://secure.paysequr.com/api-escrow/categories';

// Create an asynchronous action creator to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await axios.get(CATEGORIES_ENDPOINT);
      console.log('Fetched categories:', response.data); // Log fetched categories
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error.message); // Log error
      throw error;
    }
  }
);

// Create an asynchronous action creator to add a category
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryName) => {
    try {
      const response = await axios.post(CATEGORIES_ENDPOINT, { name: categoryName });
      console.log('Added category:', response.data); // Log added category
      return response.data;
    } catch (error) {
      console.error('Error adding category:', error.message); // Log error
      throw error;
    }
  }
);



// Create an asynchronous action creator to edit a category
export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async ({ categoryId, categoryName }) => {
    try {
      const response = await axios.post(`${CATEGORIES_ENDPOINT}/${categoryId}`, { name: categoryName });
      console.log('Edited category:', response.data); // Log edited category
      return { editedCategoryId: categoryId, updatedCategory: response.data };
    } catch (error) {
      console.error('Error editing category:', error.message); // Log error
      throw error;
    }
  }
);



// Create an asynchronous action creator to delete a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    try {
      const bodyData = {
        escrow_id: categoryId // Additional data to send along with the DELETE request
      };
              console.log('Body Data:', bodyData)

      const response = await axios.delete(`${CATEGORIES_ENDPOINT}/${categoryId}`, {
        data: JSON.stringify(bodyData)
      });
      console.log('Delete Categories from the slice store:', response)
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error.message);
      throw error;
    }
  }
);



// Define the categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
     .addCase(addCategory.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.categories = [...state.categories, action.payload]; // Create a copy of the categories array and add the newly added category
})

      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find the index of the edited category in the state
        const index = state.categories.findIndex(category => category.id === action.payload.editedCategoryId);
        if (index !== -1) {
          // Replace the old category with the updated category
          state.categories[index] = action.payload.updatedCategory;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted category from the state
        state.categories = state.categories.filter(category => category.id !== action.payload.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default categoriesSlice.reducer;
