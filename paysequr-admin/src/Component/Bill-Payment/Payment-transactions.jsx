import React, { useState } from 'react';
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, MenuItem } from '@mui/material';

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

  // Function to sort payment transactions
  const sortTransactions = (property) => {
    const sortedTransactions = [...paymentTransactions].sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    setPaymentTransactions(sortedTransactions);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Payment Transactions</Typography>
      <TextField
        select
        label="Service Category"
        value={searchCategory}
        onChange={handleCategoryChange}
        variant="outlined"
        style={{ marginRight: '1rem' }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Category 1">Category 1</MenuItem>
        <MenuItem value="Category 2">Category 2</MenuItem>
        {/* Add more categories as needed */}
      </TextField>
      <TextField
        label="Date Range"
        type="date"
        value={searchDateRange}
        onChange={handleDateRangeChange}
        variant="outlined"
        style={{ marginRight: '1rem' }}
      />
      <Button variant="contained" color="primary" style={{ marginBottom: '1rem' }}>Search</Button>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Service Category</TableCell>
                <TableCell>Service Provider</TableCell>
                <TableCell>Service Plan</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.username}</TableCell>
                  <TableCell>{transaction.serviceCategory}</TableCell>
                  <TableCell>{transaction.serviceProvider}</TableCell>
                  <TableCell>{transaction.servicePlan}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button variant="contained" color="primary" onClick={() => sortTransactions('amount')} style={{ marginRight: '1rem' }}>Sort by Amount</Button>
      <Button variant="contained" color="primary" onClick={() => sortTransactions('date')}>Sort by Date</Button>
    </Container>
  );
};

export default PaymentTransactionPage;
