
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, MenuItem } from '@mui/material';
import { ShoppingCartOutlined, ScheduleOutlined, DoneAllOutlined, Search } from '@mui/icons-material'; // Import icons
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component

// TransactionPage component
const TransactionPage = () => {
  // Dummy data for the table
  const transactions = [
    { id: 1, escrowId: 1, buyerUsername: 'JohnDoe', merchantUsername: 'JaneSmith', amount: 100, productType: 'Electronics', date: '2024-03-08', deliveryStatus: 'Delivered' },
    { id: 2, escrowId: 2, buyerUsername: 'Alice', merchantUsername: 'Bob', amount: 200, productType: 'Clothing', date: '2024-03-07', deliveryStatus: 'On transit' },
    { id: 3, escrowId: 3, buyerUsername: 'Charlie', merchantUsername: 'David', amount: 150, productType: 'Books', date: '2024-03-06', deliveryStatus: 'Not Shipped' },
  ];

  // State for basic filter
  const [filter, setFilter] = useState('');
  // State for advanced search
  const [escrowId, setEscrowId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Function to determine status background color
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Not Shipped':
        return 'rgba(255, 0, 0, 0.3)'; // Red with 30% opacity
      case 'On transit':
        return 'rgba(255, 255, 0, 0.3)'; // Yellow with 30% opacity
      case 'Delivered':
        return 'rgba(0, 128, 0, 0.3)'; // Green with 30% opacity
      default:
        return 'transparent';
    }
  };

  // Filtered transactions based on basic filter
  const filteredTransactions = transactions.filter(transaction =>
    transaction.deliveryStatus.toLowerCase().includes(filter.toLowerCase())
  );

  // Function to filter transactions by escrow ID and transaction date
  const handleSearch = () => {
    const filteredByEscrowId = transactions.filter(transaction =>
      transaction.escrowId.toString().includes(escrowId.toLowerCase())
    );
    const filteredByDate = transactions.filter(transaction =>
      transaction.date === transactionDate
    );
    const finalFilteredTransactions = filteredByEscrowId.filter(transaction =>
      filteredByDate.includes(transaction)
    );
    return finalFilteredTransactions;
  };

  // Change page handler for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change rows per page handler for pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container style={{ marginTop: '30px' }}>
      <Grid container spacing={2} justifyContent="flex-start">
      <Grid item xs={6} sm={3}>
  <Paper elevation={3} sx={{ textAlign: 'center', padding: '1rem', height: '180px', width: '230px' }}>
  <ShoppingCartOutlined sx={{ fontSize: 50, color: '#F36C00' }} />
            <Typography variant="h6" gutterBottom>Total Ongoing</Typography>
            <Typography variant="h4" component="div">5</Typography>
  </Paper>
</Grid>

<Grid item xs={6} sm={3}>
  <Paper elevation={3} sx={{ textAlign: 'center', padding: '1rem', height: '180px', width: '230px' }}>
  <ScheduleOutlined sx={{ fontSize: 50, color: '#F36C00' }} />
            <Typography variant="h6" gutterBottom>Total Pending</Typography>
            <Typography variant="h4" component="div">3</Typography>
  </Paper>
</Grid>
<Grid item xs={6} sm={3}>
  <Paper elevation={3} sx={{ textAlign: 'center', padding: '1rem', height: '180px', width: '230px' }}>
  <DoneAllOutlined sx={{ fontSize: 50, color: '#F36C00' }} />
            <Typography variant="h6" gutterBottom>Total Completed</Typography>
            <Typography variant="h4" component="div">10</Typography>
  </Paper>
</Grid>
<Grid item xs={6} sm={3}>
  {/* Filter by Status */}
  <Paper sx={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '180px', backgroundColor: 'inherit', boxShadow: 'none' }}>
    <TextField
      select
      label="Filter by Status"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      fullWidth
      style={{ marginBottom: '0.5rem' }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Pending">Not Shipped</MenuItem>
      <MenuItem value="On transit">On transit</MenuItem>
      <MenuItem value="Delivered">Delivered</MenuItem>
    </TextField>
    <TextField
      label="Trans. Date"
      fullWidth
      type="date"
      InputLabelProps={{ shrink: true }}
      size="small"
      value={transactionDate}
      onChange={(e) => setTransactionDate(e.target.value)}
      style={{ marginBottom: '0.5rem' }}
    />
    <TextField
      label="Escrow ID"
      fullWidth
      size="small"
      value={escrowId}
      onChange={(e) => setEscrowId(e.target.value)}
    />
  </Paper>
</Grid>


      </Grid>

      {/* DataGrid */}
      <div style={{ height: 400, width: '100%', marginTop: '1rem' }}>
        <DataGrid
          rows={filteredTransactions}
          columns={[
            { field: 'escrowId', headerName: 'Escrow ID', flex: 1 },
            { field: 'buyerUsername', headerName: 'Buyer Username', flex: 1 },
            { field: 'merchantUsername', headerName: 'Merchant Username', flex: 1 },
            { field: 'amount', headerName: 'Amount', flex: 1 },
            { field: 'productType', headerName: 'Product Type', flex: 1 },
            { field: 'date', headerName: 'Date of Transaction', flex: 1 },
            {
              field: 'deliveryStatus',
              headerName: 'Delivery Status',
              flex: 1,
              renderCell: (params) => (
                <span style={{ backgroundColor: getStatusBackgroundColor(params.value), borderRadius: '8px', padding: '4px 8px' }}>{params.value}</span>
              )
            },
          ]}
          pageSize={rowsPerPage}
          pagination
          onPageChange={handleChangePage}
        />
      </div>
    </Container>
  );
};

export default TransactionPage;
