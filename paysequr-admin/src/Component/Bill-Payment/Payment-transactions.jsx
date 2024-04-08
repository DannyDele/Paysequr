import React, { useState } from 'react';
import { Container, TextField, Typography, Paper, Button, MenuItem, Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const PaymentTransactionPage = () => {
  // Dummy data for payment transactions
  const [paymentTransactions, setPaymentTransactions] = useState([
    { id: 1, username: 'user1', serviceCategory: 'Category 1', serviceProvider: 'Provider 1', servicePlan: 'Plan 1', amount: 100, date: '2024-03-15', status: 'Completed' },
    { id: 2, username: 'user2', serviceCategory: 'Category 2', serviceProvider: 'Provider 2', servicePlan: 'Plan 2', amount: 200, date: '2024-03-16', status: 'Pending' },
    { id: 3, username: 'user3', serviceCategory: 'Category 1', serviceProvider: 'Provider 3', servicePlan: 'Plan 3', amount: 300, date: '2024-03-17', status: 'Completed' },
  ]);

  const [searchCategory, setSearchCategory] = useState('');
  const [searchDateRange, setSearchDateRange] = useState('');

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    setSearchDateRange(e.target.value);
  };

  // Function to filter transactions by escrow ID and transaction date
const handleSearch = () => {
  let filteredTransactions = [...transactions];
  
  // Filter by escrow ID
  if (escrowId !== '') {
    filteredTransactions = filteredTransactions.filter(transaction =>
      transaction.escrowId.toString().toLowerCase().includes(escrowId.toLowerCase())
    );
  }

  // Filter by transaction date
  if (transactionDate !== '') {
    filteredTransactions = filteredTransactions.filter(transaction =>
      transaction.date === transactionDate
    );
  }

  // Filter by delivery status
  if (filter !== '') {
    filteredTransactions = filteredTransactions.filter(transaction =>
      transaction.deliveryStatus.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return filteredTransactions;
};

  // Function to filter payment transactions based on search criteria
  const filterTransactions = () => {
    let filteredTransactions = [...paymentTransactions];
    if (searchCategory) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.serviceCategory === searchCategory);
    }
    if (searchDateRange) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.date === searchDateRange);
    }
    return filteredTransactions;
  };

  // Function to sort payment transactions
  const sortTransactions = (property) => {
    const sortedTransactions = [...paymentTransactions].sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    setPaymentTransactions(sortedTransactions);
  };

  const columns = [
    { field: 'id', headerName: 'Transaction ID', width: 130 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'serviceCategory', headerName: 'Service Category', width: 150 },
    { field: 'serviceProvider', headerName: 'Service Provider', width: 150 },
    { field: 'servicePlan', headerName: 'Service Plan', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Container>
      <Typography variant="h4" className='text-gray-700' style={{marginTop:'20px'}} gutterBottom>Payment Transactions</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Service Category"
            value={searchCategory}
            onChange={handleCategoryChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label=""
            type="date"
            value={searchDateRange}
            onChange={handleDateRangeChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" color="primary" onClick={() => setPaymentTransactions(filterTransactions())} fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={3} style={{ marginTop: '1rem' }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={paymentTransactions}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Paper>
     
    </Container>
  );
};

export default PaymentTransactionPage;
