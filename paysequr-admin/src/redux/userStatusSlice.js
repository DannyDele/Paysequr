import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../Component/utils/tokenManager';


const token = getToken()

// Define an asynchronous thunk action to disable or activate a user
export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ userId, status }, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://secure.paysequr.com/api-admin/status',
        { id: userId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state and reducers
const userStatusSlice = createSlice({
  name: 'userStatus',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserStatus.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default userStatusSlice.reducer;
