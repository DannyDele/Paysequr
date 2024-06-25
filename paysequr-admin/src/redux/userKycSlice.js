// Redux slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../Component/utils/tokenManager';

const token = getToken()

const API_ENDPOINT = 'https://secure.paysequr.com'

// Fetch User KYC data
export const fetchUserKyc = createAsyncThunk('userKyc/fetchUserKyc', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/api-admin/kyc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Fetched Users:', response.data)
    return response.data;
  } catch (error) {
    console.log('cannot fetch user kyc info:', error.response.data) // Throw the error response data
    return rejectWithValue(error.response.data);  // Use rejectWithValue to pass the error payload to the slice
  }
});

// Approve KYC verification for a user
export const approveUserKyc = createAsyncThunk(
  'userKyc/approve',
  async (userId) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api-admin/user/kyc/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data upon success
    } catch (error) {
      // Handle the error response from the server
      if (error.response && error.response.data) {
        return error.response.data; // Throw the error response data
      } else {
        throw error; // Re-throw the original error if no response data is available
      }
    }
  }
);

// Approve KYC Document verification for a user
export const approveUserKycDocument = createAsyncThunk(
  'userKyc/approveDocument',
  async (userId) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api-admin/user/kyc/document/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the response data upon success
    } catch (error) {
      // Handle the error response from the server
      if (error.response && error.response.data) {
        return error.response.data; // Throw the error response data
      } else {
        throw error; // Re-throw the original error if no response data is available
      }
    }
  }
);


// Approve KYC Document verification for a user
export const approveUserKycAddress = createAsyncThunk(
  'userKyc/approveAddress',
  async (userId) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api-admin/user/kyc/adress/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User KYC address response:', response.data)
      return response.data; // Return the response data upon success
    } catch (error) {
      // Handle the error response from the server
      if (error.response && error.response.data) {
        return error.response.data; // Throw the error response data
      } else {
        throw error; // Re-throw the original error if no response data is available
      }
    }
  }
);

// Define a slice for user KYC
const userKycSlice = createSlice({
  name: 'userKyc',
  initialState: {
    userKyc: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserKyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserKyc.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userKyc = action.payload; // Assign the fetched data directly to userKyc
      })
         .addCase(fetchUserKyc.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.msg || 'An unknown error occurred';  // Extract and set the error message
        console.log('error fetching user kyc:', action.payload);
      })
      .addCase(approveUserKyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveUserKyc.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the status of the user in userKyc state based on the response data
        state.userKyc = state.userKyc.map((user) =>
          user.id === action.payload.userId ? { ...user, status: action.payload.status } : user
        );
      })
      .addCase(approveUserKyc.rejected, (state, action) => {
        state.status = 'failed';
        // Access the error payload and extract the message
        const errorPayload = action.error;
        const errorMessage = errorPayload?.response?.data?.Error?.message || 'An unknown error occurred';
        state.error = errorMessage; // Set the error message
      })
      .addCase(approveUserKycDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveUserKycDocument.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the status of the user in userKyc state based on the response data
        state.userKyc = state.userKyc.map((user) =>
          user.id === action.payload.userId ? { ...user, documentStatus: action.payload.status } : user
        );
      })
      .addCase(approveUserKycDocument.rejected, (state, action) => {
        state.status = 'failed';
        // Access the error payload and extract the message
        const errorPayload = action.error;
        const errorMessage = errorPayload?.response.data || 'An unknown error occurred';
        state.error = errorMessage; // Set the error message
      })
      .addCase(approveUserKycAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveUserKycAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the status of the user in userKyc state based on the response data
        state.userKyc = state.userKyc.map((user) =>
          user.id === action.payload.userId ? { ...user, addressStatus: action.payload.status } : user
        );
      })
      .addCase(approveUserKycAddress.rejected, (state, action) => {
        state.status = 'failed';
        // Access the error payload and extract the message
        const errorPayload = action.error;
        const errorMessage = errorPayload?.response.data || 'An unknown error occurred';
        state.error = errorMessage; // Set the error message
      });
  },
});

export default userKycSlice.reducer;
