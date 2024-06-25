import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, DialogActions, Dialog, DialogContent, DialogTitle, CircularProgress, Button, Chip, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Carousel from 'react-elastic-carousel';
import CloseIcon from '@mui/icons-material/Close';
import {  useDispatch, useSelector } from 'react-redux';
import {fetchAllEscrow } from '../../redux/escrowSlice'


const OrderPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.escrow.escrow);
    const error = useSelector((state) => state.escrow.error);
  const loading = useSelector((state) => state.escrow.loading);

  useEffect(() => {
    const fetch = async () => {
          const response = await dispatch(fetchAllEscrow())
    }
    fetch()
  }, [dispatch])

  // Function to determine status background color
  const getStatusBackgroundColor = (status) => {
   switch (status) {
      case 'canceled':
        return <Chip label="Canceled" color="error" />;
      case 'modified by buyer':
        return <Chip label="Modified by Buyer" sx={{backgroundColor:'green', color: 'white'}} />;
      case 'modified by merchant':
        return <Chip label="Modified by Merchant" sx={{backgroundColor:'green', color: 'white'}} />;
      default:
        return <Chip label={status} />;
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
    filteredOrders = filteredOrders.filter(order => {
      const buyer = order.buyer ? JSON.parse(order.buyer) : null;
      return (
        order?.escrow_id.includes(searchTransactionIdOrUsername) ||
        (buyer && buyer.lastname && buyer.lastname.toLowerCase().includes(searchTransactionIdOrUsername.toLowerCase()))
      );
    });
  }

  if (searchTransactionDate) {
    filteredOrders = filteredOrders.filter(order => order.created_at === searchTransactionDate);
  }

  return filteredOrders;
};


  // Function to handle view button click
  const handleView = (params) => {
    const { escrow_id } = params.row;
    const clickedProduct = orders.find(order => order.escrow_id === escrow_id);
    setSelectedProduct(clickedProduct);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Columns configuration for DataGrid
  const columns = [
    { field: 'escrow_id', headerName: 'Escrow ID', flex: 1 },
 {
      field: 'created_at',
      headerName: 'Date of Transaction',
      flex: 1,
      valueGetter: (params) => new Date(params.row.created_at).toLocaleDateString(),
    },
    { field: 'transactionId', headerName: 'Transaction ID', flex: 1 },
    { field: 'productName', headerName: 'Product Name', flex: 1 },
   {
      field: 'buyerName',
      headerName: 'Buyer Username',
      flex: 1,
      valueGetter: (params) => JSON.parse(params.row.buyer).username,
    },
    {
      field: 'sellerName',
      headerName: 'Merchant Username',
      flex: 1,
      valueGetter: (params) => JSON.parse(params.row.seller).username,
    },
    {
      field: 'amount_to_seller',
      headerName: 'Amount',
      flex: 1,
       renderCell: (params) => (
         <span>&#8358;  
           {params.value}
          </span> 
      )
    },
     {
      field: 'escrow_status',
      headerName: 'Delivery Status',
      flex: 1,
      renderCell: (params) => getStatusBackgroundColor(params.value),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant='contained'
      color="primary" onClick={() => handleView(params)}>View</Button>
      )
    },
  ];


 // Function to display images in a carousel
const renderProductImages = () => {
    const parsedProductData = JSON.parse(selectedProduct?.item);

    // Check if parsedProductData.images is a string and parse it if necessary
    const imagesArray = typeof parsedProductData.images === 'string' 
        ? JSON.parse(parsedProductData.images) 
        : parsedProductData.images;

    return (
        <Carousel showArrows={false}>
            {Array.isArray(imagesArray) && imagesArray.map((image, index) => (
        <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '300px', height:'300px', borderRadius: '5px' }} />
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
      {loading ? (
                <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
      ) : (
      <div style={{ height: 500, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          rows={handleSearch()}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.escrow_id} // Use a field that you know is unique

        />
        </div>
          )
        }
      <Dialog open={openDialog} onClose={handleCloseDialog} 
  fullWidth
  > 
        <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '0.5rem',marginBottom:'20px', borderBottom: '1px solid #ccc' }}>{selectedProduct && JSON.parse(selectedProduct?.item)?.name }</DialogTitle>
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
   <Button
      startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }} />}
      variant="contained"
      onClick={handleCloseDialog}
      style={{ transition: 'background-color 0.3s' }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
      }}
    >
      Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderPage;
