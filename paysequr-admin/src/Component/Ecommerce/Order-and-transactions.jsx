import React, { useState } from 'react';
import { Container, Typography, TextField, DialogActions, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Carousel from 'react-elastic-carousel';

const OrderPage = () => {
  // Dummy data for orders
  const orders = [
    { id: 1, date: '01/03/2024', transactionId: '123456', productName: 'Product A', price: 100, buyerUsername: 'buyer1', sellerUsername: 'seller1', status: 'Pending' , productCategory: 'Category 1',  discount: 10, images: ['https://via.placeholder.com/150'], description: 'Product A Description', availability: 'In stock', specifications: 'Product A Specifications', shippingInfo: 'Shipping Information for Product A'  },
    { id: 2, date: '02/03/2024', transactionId: '123457', productName: 'Product B', price: 200, buyerUsername: 'buyer2', sellerUsername: 'seller2', status: 'Completed' , productCategory: 'Category 1',  discount: 10, images: ['https://via.placeholder.com/150'], description: 'Product A Description', availability: 'In stock', specifications: 'Product A Specifications', shippingInfo: 'Shipping Information for Product A' },
    { id: 3, date: '03/03/2024', transactionId: '123458', productName: 'Product C', price: 150, buyerUsername: 'buyer3', sellerUsername: 'seller3', status: 'Pending', productCategory: 'Category 1',  discount: 10, images: ['https://via.placeholder.com/150'], description: 'Product A Description', availability: 'In stock', specifications: 'Product A Specifications', shippingInfo: 'Shipping Information for Product A'  },
  ];

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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Function to handle view button click
  const handleView = (params) => {
    const { id } = params.row;
    const clickedProduct = orders.find(order => order.id === id);
    setSelectedProduct(clickedProduct);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Columns configuration for DataGrid
  const columns = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'transactionId', headerName: 'Transaction ID', width: 140 },
    { field: 'productName', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 100 },
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
    {
      field: 'view',
      headerName: 'View',
      width: 100,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleView(params)}>View</Button>
      )
    },
  ];


  // Function to display images in a carousel
  const renderProductImages = () => {
    return (
      <Carousel showArrows={false}>
        {selectedProduct.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '60%', borderRadius: '5px' }} />
        ))}
      </Carousel>
    );
  };

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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '0.5rem',marginBottom:'20px', borderBottom: '1px solid #ccc' }}>{selectedProduct && selectedProduct.productName}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              {renderProductImages()}
              <Typography variant="body1" gutterBottom style={{ marginTop: '1rem' }}>{selectedProduct.description}</Typography>
              <Typography variant="body2" gutterBottom><strong>Price:</strong> ₦{selectedProduct.price}</Typography>
              <Typography variant="body2" gutterBottom><strong>Availability:</strong> {selectedProduct.availability}</Typography>
              <Typography variant="body2" gutterBottom><strong>Category:</strong> {selectedProduct.productCategory}</Typography>
              <Typography variant="body2" gutterBottom><strong>Discount:</strong> {selectedProduct.discount}%</Typography>
              <Typography variant="body2" gutterBottom><strong>Specifications:</strong> {selectedProduct.specifications}</Typography>
              <Typography variant="body2" gutterBottom><strong>Shipping Information:</strong> {selectedProduct.shippingInfo}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions style={{ borderTop: '1px solid #ccc', padding: '0.5rem' }}>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderPage;
