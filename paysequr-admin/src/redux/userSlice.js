import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_ENDPOINT = 'https://secure.paysequr.com'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbm55IiwidXNlcklkIjozLCJpYXQiOjE3MTQzODczNjksImV4cCI6MTcxNDk5MjE2OX0.l2Wy1DJmuG3DFOXNg3ajWpqa84Xb0Dda3HGvmd06BCo'

// Function to fecth all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/api-admin/all_users`, {
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


// Function to Delete a user

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (userId) => {
  const userData = {
    username: "danny",
    email: "danielpope770@gmail.com",
    password: "Iyeyimosi1"
  };

  const response = await axios.delete(`${API_ENDPOINT}/api-admin/user/${userId}`, {
    data: userData, // Pass the user data as the request body
    headers: {  
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Deleted User Response:', response.data);
  return response.data;
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
      })
      .addCase(deleteUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
  state.status = 'succeeded';
  const deletedUserId = action.meta.arg; // Extract the user ID from the action meta
  // Update the users array by removing the deleted user
  state.users = state.users.filter(user => user.id !== deletedUserId);
})

      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default userSlice.reducer;