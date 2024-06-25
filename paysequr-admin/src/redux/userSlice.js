import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../Component/utils/tokenManager';



const API_ENDPOINT = 'https://secure.paysequr.com'

const token = getToken()
// Function to fecth all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/api-admin/all_users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      console.log('Users coming from thunk:',response.data.users.result)
    return response.data.users.result;
  } catch (error) {
    console.log('Error fetching users:', error)
    return rejectWithValue(error.response.data);  // Use rejectWithValue to pass the error payload to the slice
  }
});


// Function to fetch a user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/api-admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User Details:', response.data);
    return response.data.user.result[0]; // Assuming the response contains a single user object
  } catch (error) {
    console.log('Error fetching user from slice:', error)
    return error.response.data;
  }
});



// Function to fetch user account details
export const fetchUserAccount = createAsyncThunk('users/fetchUserAccount', async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/api-wallet/get-user-account?userid=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User Account Details:', response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});



// Function to Delete a user

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (userId) => {
  const userData = {
    username: "danny",
    email: "danielpope770@gmail.com",
    password: "Iyeyimosi1"
  };

  try {
    
    const response = await axios.delete(`${API_ENDPOINT}/api-admin/user/${userId}`, {
      data: userData, // Pass the user data as the request body
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Deleted User Response:', response.data);
    return response.data;
    

  }catch (error) {
   return error.response.data

  }
  })




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
        state.error = action.payload.msg || 'An unknown error occurred';  // Extract and set the error message
      })
      .addCase(fetchUserAccount.pending, (state) => {
    state.status = 'loading';
      })
       .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload; // Update the state with the fetched user
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.msg;
      })
  .addCase(fetchUserAccount.fulfilled, (state, action) => {
    state.status = 'succeeded';
    // Update the state with the fetched user account details
    state.userAccount = action.payload;
  })
  .addCase(fetchUserAccount.rejected, (state, action) => {
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