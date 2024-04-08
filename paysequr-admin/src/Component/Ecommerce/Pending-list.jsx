import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Carousel from 'react-elastic-carousel';

const PendingListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dummy data for pending list
  const pendingList = [
    { id: 1, username: 'user1', productName: 'Product A', productCategory: 'Category 1', price: 100, discount: 10, images: ['https://via.placeholder.com/150'], description: 'Product A Description', availability: 'In stock', specifications: 'Product A Specifications', shippingInfo: 'Shipping Information for Product A' },
    { id: 2, username: 'user2', productName: 'Product B', productCategory: 'Category 2', price: 200, discount: 20, images: ['https://via.placeholder.com/150'], description: 'Product B Description', availability: 'Out of stock', specifications: 'Product B Specifications', shippingInfo: 'Shipping Information for Product B' },
    { id: 3, username: 'user3', productName: 'Product C', productCategory: 'Category 1', price: 150, discount: 15, images: ['https://via.placeholder.com/150'], description: 'Product C Description', availability: 'In stock', specifications: 'Product C Specifications', shippingInfo: 'Shipping Information for Product C' },
  ];

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const renderProductImages = () => {
    return (
      <Carousel>
        {selectedProduct.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '100%', borderRadius: '5px' }} />
        ))}
      </Carousel>
    );
  };

  return (
    <Container>
      <Typography variant="h4" className='text-gray-700'style={{marginTop:'20px'}} gutterBottom>Pending List</Typography>
      <div style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          rows={pendingList}
          columns={[
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'username', headerName: 'Username', width: 150 },
            { field: 'productName', headerName: 'Product Name', flex: 1 },
            { field: 'productCategory', headerName: ' Category', flex: 1 },
            { field: 'price', headerName: 'Price', width: 120 },
            {
              field: 'view',
              headerName: 'View',
              width: 120,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewProduct(params.row)}
                >
                  View
                </Button>
              ),
            },
          ]}
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

export default PendingListPage;
