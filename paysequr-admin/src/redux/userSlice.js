import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsInVzZXJJZCI6MiwiaWF0IjoxNzEyNzI5OTYxLCJleHAiOjE3MTMzMzQ3NjF9.VWu-9PWq6FZoURH21788Wj5hW8HC2ZyBfAh43kyTl7g'


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get('https://secure.paysequr.com/api-admin/all_users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      console.log(response.data.users.result)
    return response.data.users.result;
  } catch (error) {
    throw Error(error.response.data.message); // You may want to handle errors more gracefully
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;