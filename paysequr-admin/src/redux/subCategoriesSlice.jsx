import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios
import { v4 as uuidv4 } from 'uuid'; // Import uuid


const API_ENDPOINT = 'https://secure.paysequr.com'

// Thunk function to fetch all items from the API endpoint
export const fetchAllSubCategories = createAsyncThunk(
  'subCategories/fetchAllSubCategories',
  async () => {
    const response = await axios.get(`${API_ENDPOINT}/api-escrow/subcategories`);
    console.log('All Sub Categories Added:', response.data)
    return response.data;
  }
);

export const addSubCategories = createAsyncThunk(
  'subCategories/SubCategories',
  async (subCategoryName) => {
    const response = await axios.post(`${API_ENDPOINT}/api-escrow/subcategories`, { name: subCategoryName }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('New Sub Category Added:', response.data)
    return response.data;
  }
);

export const deleteSubCategory = createAsyncThunk(
  'subCategories/deleteSubCategory',
  async (subcategoryId) => {
  
      const bodyData = {
        escrow_id: subcategoryId // Additional data to send along with the DELETE request
      };
              console.log('Body Data:', bodyData)

    const response = await axios.delete(`${API_ENDPOINT}/api-escrow/subcategories/${subcategoryId}`, {
              data: JSON.stringify(bodyData)

    });
    console.log('Deleted subCategory:', response.data)
    return response.data;
  }
);


// Slice for handling items state
const subCategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: {
    subcategories: [],
    loading: false,
    error: null,
  },
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllSubCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subcategories = action.payload.subcategories;
      })
      .addCase(fetchAllSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSubCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
     .addCase(addSubCategories.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.subcategories = [...state.subcategories, action.payload.data];
})
      .addCase(addSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
        .addCase(deleteSubCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming you want to keep the state items as they are after deletion
              state.subcategories = state.subcategories.filter(subcategoryId => subcategoryId.id !== action.meta.arg);

      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the slice reducer

// export const { itemDeleted } = itemsSlice.actions;
export default subCategoriesSlice.reducer;