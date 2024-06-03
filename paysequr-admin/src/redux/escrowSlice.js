import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_ENDPOINT = 'https://secure.paysequr.com'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbm55IiwidXNlcklkIjozLCJpYXQiOjE3MTY5MzY4MDEsImV4cCI6MTcxNzU0MTYwMX0.HpnXrpCS1mxAEgm6SBXEqUlnVjlBnjaaeiBRNjjM2tw'

// Thunk function to fetch all escrow from the API endpoint

export const fetchAllEscrow = createAsyncThunk(
  'escrow/fetchAllEscrow',
    async (_, { dispatch }) => {
      try{
    const response = await axios.get(`${API_ENDPOINT}/api-admin/get-all-escrow`);
    const transactions = response.data;

    // Fetch user details for each transaction
    const userDetailsPromises = transactions.map(async (transaction) => {
        const buyerResponse = await axios.get(`${API_ENDPOINT}/api-admin/user/${transaction.buyer_id}`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
      },
            }
        );
        const sellerResponse = await axios.get(`${API_ENDPOINT}/api-admin/user/${transaction.seller_id}`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
      },
    }
        );
        
        console.log('Buyer Response:', buyerResponse)
      
      return {
        ...transaction,
        buyerName: `${buyerResponse.data.user.result[0].firstname} ${buyerResponse.data.user.result[0].lastname}`,
        sellerName: `${sellerResponse.data.user.result[0].firstname} ${sellerResponse.data.user.result[0].lastname}`
      };
    });

    const transactionsWithUserDetails = await Promise.all(userDetailsPromises);
    
          return transactionsWithUserDetails;
      } catch (error) {
          console.log('Error fetching escrow transactions:', error)
          }
  }
);





// Slice for handling escrow state
const escrowSlice = createSlice({
  name: 'escrow',
  initialState: {
    escrow: [],
    loading: false,
    error: null,
  },
    reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(fetchAllEscrow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEscrow.fulfilled, (state, action) => {
        state.loading = false;
        state.escrow = action.payload;
      })
      .addCase(fetchAllEscrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

// Export the slice reducer

export default escrowSlice.reducer;