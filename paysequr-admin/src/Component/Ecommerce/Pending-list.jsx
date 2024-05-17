import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle, DialogActions,
  TextField, 
  Input,
  MenuItem,
  CircularProgress,
  IconButton,
  Box,
  Grid
} from '@mui/material'; import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add, Visibility} from '@mui/icons-material';
import Carousel from 'react-elastic-carousel';
import { fetchAllItems, addItem, deleteItem } from './../../redux/itemsSlice'; // Import fetchAllItems action creator


import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';










const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));






const PendingListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Redux state for product items
  const productItems = useSelector((state) => state.items.items);
  const subcategories = useSelector((state) => state.subcategories.subcategories);
    const loading = useSelector((state) => state.items.loading); // Access loading state

  const dispatch = useDispatch();
  const classes = useStyles();


  // State for managing the selected product for viewing
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  
  
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
      const [message, setMessage] = useState('');




  // Fetch all items from the API when component mounts
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchAllItems());
      // dispatch(fetchAllSubCategories())

    }
    fetch()
    
  }, [dispatch]);




   // Function to handle opening the product dialog for editing
 const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleApprove = () => {
    // Logic to approve the selected product
    // This can include updating the product status in the database, sending notifications, etc.
    console.log("Product approved:", selectedProduct);
    // Close the dialog after approval
    handleCloseDialog();
  };








  // Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};
  

  // Columns configuration for product categories table
const itemColumns = [
    {
      field: 'id',
      headerName: 'Product Id',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <span>
        <IconButton style={{color:'blue'}} onClick={() => handleViewProduct(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteProduct(params.row.id)}>
          <Delete />
          </IconButton>

          
          </span>
      ),
    },
  ];









  const renderProductImages = () => {

      // Parse the images string to an array
  const imagesArray = JSON.parse(selectedProduct.images || '[]');
   
    return (
      
      <Carousel showArrows={false}>
      {imagesArray.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '60%', borderRadius: '5px' }} />
        ))}

<style >{`
    .rec-dot {
      width: 5px;
      height: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      margin: 0 7px;
    }

    .rec-dot_active {
      background-color: grey;
    }

    .rec-dot:nth-child(4) {
      display: none;
    }
  `}</style>
      </Carousel>
    );
  };

  return (
    <Container>



 {/* Snackbar component */}

<Snackbar
  anchorOrigin={{
    vertical: 'top', // Change to 'top'
    horizontal: 'right', // Change to 'right'
  }}
  open={snackbarOpen}
  autoHideDuration={6000}
        onClose={handleSnackbarClose}
                TransitionComponent={Slide} // Use Slide transition

>
  <SnackbarContent
    className={snackbarSeverity === 'success' ? classes.success : classes.error}
    message={
      <span className={classes.message}>
        <CheckCircleIcon className={classes.icon} />
        {snackbarMessage}
      </span>
    }
    action={[
      <IconButton key="close" color="inherit" onClick={handleSnackbarClose}>
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
  />
</Snackbar>



      <Typography variant="h4" className='text-gray-700'style={{marginTop:'20px'}} gutterBottom>Product Approval List</Typography>
      <div style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          // rows={pendingList}
          rows={productItems}
            columns={itemColumns}
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
              <Typography variant="body2" gutterBottom><strong>Category:</strong> {selectedProduct.category}</Typography>
              <Typography variant="body2" gutterBottom><strong>Discount:</strong> {selectedProduct.discount}%</Typography>
              <Typography variant="body2" gutterBottom><strong>Specifications:</strong> {selectedProduct.specifications}</Typography>
              <Typography variant="body2" gutterBottom><strong>Shipping Information:</strong> {selectedProduct.shippingInfo}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions style={{ borderTop: '1px solid #ccc', padding: '0.5rem' }}>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="outlined" color="primary" onClick={handleApprove}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PendingListPage;
