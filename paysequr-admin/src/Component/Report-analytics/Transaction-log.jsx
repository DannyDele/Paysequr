import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const TransactionLog = () => {
  // Sample transaction data
  const [transactions] = useState([
    { id: 1, date: '2024-03-01', description: 'Payment from User A', amount: 100.0, status: 'Completed', username: 'User A' },
    { id: 2, date: '2024-03-02', description: 'Payment to User B', amount: -50.0, status: 'Completed', username: 'User B' },
    { id: 3, date: '2024-03-03', description: 'Payment from User C', amount: 75.0, status: 'Pending', username: 'User C' },
    { id: 4, date: '2024-03-04', description: 'Payment to User D', amount: -30.0, status: 'Completed', username: 'User D' },
    { id: 5, date: '2024-03-05', description: 'Payment from User E', amount: 120.0, status: 'Completed', username: 'User E' },
  ]);

  // Columns configuration for the data grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 100 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleSearch = () => {
    const filtered = transactions.filter(transaction =>
      transaction.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Box mb={2} display="flex" justifyContent="center">
          <TextField
            label="Search Transactions"
            variant="outlined"
            value={searchKeyword}
            style={{width:'100%'}}
            onChange={(e) => setSearchKeyword(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button variant="contained" onClick={handleSearch}>Search</Button>
              ),
            }}
          />
        </Box>
        <div style={{ height: 400, width: '850px', margin: '0 auto 0 0' }}>
          <DataGrid
            rows={filteredTransactions}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Container>
  );
};

export default TransactionLog;
