import React, { useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const OrderPage = () => {
  // Dummy data for orders
  const [orders, setOrders] = useState([
    { id: 1, date: '01/03/2024', transactionId: '123456', productName: 'Product A', price: 100, buyerUsername: 'buyer1', sellerUsername: 'seller1', status: 'Pending' },
    { id: 2, date: '02/03/2024', transactionId: '123457', productName: 'Product B', price: 200, buyerUsername: 'buyer2', sellerUsername: 'seller2', status: 'Completed' },
    { id: 3, date: '03/03/2024', transactionId: '123458', productName: 'Product C', price: 150, buyerUsername: 'buyer3', sellerUsername: 'seller3', status: 'Pending' },
  ]);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'rgba(255, 255, 0, 0.3)'; // Yellow with 30% opacity
      case 'Completed':
        return 'rgba(0, 128, 0, 0.3)'; // Green with 30% opacity
      default:
        return 'transparent';
    }
  };

  // State variables for search criteria
  const [searchTransactionIdOrUsername, setSearchTransactionIdOrUsername] = useState('');
  const [searchTransactionDate, setSearchTransactionDate] = useState('');

  // Function to handle changes in search criteria
  const handleTransactionIdOrUsernameChange = (e) => {
    setSearchTransactionIdOrUsername(e.target.value);
  };

  const handleTransactionDateChange = (e) => {
    setSearchTransactionDate(e.target.value);
  };

  // Function to filter orders based on search criteria
  const handleSearch = () => {
    let filteredOrders = [...orders];

    if (searchTransactionIdOrUsername) {
      filteredOrders = filteredOrders.filter(order =>
        order.transactionId.includes(searchTransactionIdOrUsername) ||
        order.buyerUsername.toLowerCase().includes(searchTransactionIdOrUsername.toLowerCase())
      );
    }

    if (searchTransactionDate) {
      filteredOrders = filteredOrders.filter(order => order.date === searchTransactionDate);
    }

    return filteredOrders;
  };

  // Columns configuration for DataGrid
  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'transactionId', headerName: 'Transaction ID', width: 180 },
    { field: 'productName', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'buyerUsername', headerName: 'Buyer Username', width: 180 },
    { field: 'sellerUsername', headerName: 'Seller Username', width: 180 },
    {
      field: 'status',
      headerName: ' Status',
      flex: 1,
      renderCell: (params) => (
        <span style={{ backgroundColor: getStatusBackgroundColor(params.value), borderRadius: '8px', padding: '4px 8px' }}>{params.value}</span>
      )
    },
  ];

  return (
    <Container>
      <Typography variant="h4" className='text-gray-700' style={{marginTop:'20px'}} gutterBottom>Orders</Typography>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label="Transaction ID or Username"
          variant="outlined"
          value={searchTransactionIdOrUsername}
          onChange={handleTransactionIdOrUsernameChange}
          style={{ marginRight: '1rem' }}
        />
        <TextField
          label="Transaction Date"
          variant="outlined"
          type="date"
          value={searchTransactionDate}
          onChange={handleTransactionDateChange}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <div style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          rows={handleSearch()}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </Container>
  );
};

export default OrderPage;
