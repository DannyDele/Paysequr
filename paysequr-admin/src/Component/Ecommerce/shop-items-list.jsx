import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField, 
  Input,
   FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  CircularProgress,
  IconButton,
  Box,
  Grid
} from '@mui/material';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
  HourglassEmpty,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { styled, alpha } from '@mui/material/styles';
import { Edit, Delete, Add, Visibility} from '@mui/icons-material';
import Carousel from 'react-elastic-carousel';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAllItems, verifyItem } from '../../redux/itemsSlice'; // Import fetchAllItems action creator
import Swal from 'sweetalert2';


// import for mui snackbar component
import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';









const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));












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






const ShopApprovalList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Redux state for product items
  const productItems = useSelector((state) => state.items.items);
  const subcategories = useSelector((state) => state.subcategories.subcategories);
    const loading = useSelector((state) => state.items.loading); // Access loading state

  const dispatch = useDispatch();
  const classes = useStyles();


  // State for managing the selected product for viewing
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);


  // State to store shop id
  const [storeid, setStoreId] = useState(''); // State to hold the input value

  
  
  // Local loading state for verifyShop action
  const [verifyLoading, setVerifyLoading] = useState(false);


  
  // state to manage the action button
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  
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

  


  // funtion to search for a user items in the store by the users store id

   const handleSearch = async () => {
    // Fetch items for the specified storeid
    if (storeid) {
      const searchedItems = await dispatch(fetchAllItems(storeid));
      console.log('All searched user items in the store:', searchedItems)
    }
  };


   // Function to handle opening the product dialog for editing
 const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // function to verify a users item
  const handleVerifyProduct  = async () => {
    // Logic to approve the selected shop
    // This can include updating the shop status in the database, sending notifications, etc.
     setVerifyLoading(true);
    try {
      const verifyProductResponse = await dispatch(verifyItem(selectedProductId)).unwrap();
      const verifyMessage = verifyProductResponse.msg && 'Product approved successfully';

      setSnackbarSeverity('success');
      setSnackbarMessage(verifyMessage);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to approve shop');
      setSnackbarOpen(true);
    } finally {
      setVerifyLoading(false);
      handleCloseDialog();
    }
  };




  // Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
  };
  

    // Function to open action menu
  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedProductId(row.id);
    setSelectedProduct(row);
  };

    // Function to close action menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  



  
   // *************************************************************
  // function to open action menu for delete or view a product
  // *************************************************************
const handleMenuAction = async (action) => {
    handleMenuClose();
    if (action === 'View') { 
      handleViewProduct(selectedProduct);
      setOpenProductDialog(true);
    } 
    else if (action === 'Delete') {
      // Use SweetAlert for delete confirmation
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete product',
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteProduct(selectedProductId);
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        }
      });
    }
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
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
         <span>
          {params.value}
          {params.value === 'approved' ? (
            <VerifiedIcon style={{ color: 'green', marginRight: 5 }} />
          ) : (
            <HourglassEmpty style={{ color: '#227BD4', marginRight: 5 }} />
          )}
        </span>
      )
    },


    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
       <Button
            aria-controls={menuAnchorEl ? 'customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuAnchorEl ? 'true' : undefined}
            variant="contained"
            size="small"
            endIcon={<ArrowDropDownIcon />}
            onClick={(event) => handleMenuOpen(event, params.row)}
          >
            Action
          </Button>

          
          </div>
      ),
    },
  ];



// function to extract every product properties
  




  const renderProductImages = () => {

      // Parse the images string to an array
  const imagesArray = JSON.parse(selectedProduct.images || '[]');
   
    return (
      
      <Carousel showArrows={false}>
      {imagesArray.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '300px', height:'300px', borderRadius: '5px' }} />
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


      



      <Typography variant="h4" className='text-gray-700' style={{ marginTop: '20px' }} gutterBottom>Product Approval List</Typography>


        
        <div className='flex justify-end items-center'>

          
          
        <div>
         <TextField
            label="StoreID"
            id="outlined-size-small"
            value={storeid}
            onChange={(e) => setStoreId(e.target.value)}
            size="small"
          />
        </div>




          <div className='ml-2'>
           <Button startIcon={<SearchIcon />} variant="outlined" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>

      </div>
      

   
        
         
      


      {loading ? (
      <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
      ) : productItems.length === 0 ? (
         
          <Typography>No items available in the store...</Typography>
  
          ) 
        : (
           <div style={{ height: 400, width: '100%', marginTop: '2rem' }}>
        <DataGrid
          // rows={pendingList}
          rows={productItems}
            columns={itemColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
     )}
      <Dialog open={openDialog} onClose={handleCloseDialog}  maxWidth="md" fullWidth>
        <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '0.5rem',marginBottom:'20px', borderBottom: '1px solid #ccc' }}>{selectedProduct && selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              {renderProductImages()}
                            <Typography variant="body1" gutterBottom style={{ marginTop: '1rem' }}>{selectedProduct?.description}</Typography>

              <div className='flex items-center justify-between'>
                <div>
      <Typography variant="body2" gutterBottom><strong>Price:</strong> ₦{selectedProduct?.price}</Typography>
      <Typography variant="body2" gutterBottom><strong>Availability:</strong> {selectedProduct?.availability}</Typography>
      <Typography variant="body2" gutterBottom><strong>Category:</strong> {selectedProduct?.category}</Typography>
      <Typography variant="body2" gutterBottom><strong>Discount:</strong> {selectedProduct?.discount}%</Typography>
      <Typography variant="body2" gutterBottom><strong>Specifications:</strong> {selectedProduct?.specifications}</Typography>
                  <Typography variant="body2" gutterBottom><strong>Shipping Information:</strong> {selectedProduct?.shippingInfo}</Typography>
                        <Typography variant="body2" gutterBottom><strong>Brand:</strong> {selectedProduct?.brand}</Typography>

      </div>
                {/* Add more details as needed */}
                <div>
      <Typography variant="body2" gutterBottom><strong>Color:</strong> {selectedProduct?.color}</Typography>
      <Typography variant="body2" gutterBottom><strong>Delivery:</strong> {selectedProduct?.delivery}</Typography>
      <Typography variant="body2" gutterBottom><strong>Inspection Period:</strong> {selectedProduct?.inspection_period}</Typography>
      <Typography variant="body2" gutterBottom><strong>Key Features:</strong> {selectedProduct?.key_features}</Typography>
                  <Typography variant="body2" gutterBottom><strong>Location:</strong> {selectedProduct?.location}</Typography>
                        <Typography variant="body2" gutterBottom><strong>Size:</strong> {selectedProduct?.size}</Typography>

                </div>

              <div className='items-center'>  
      <Typography variant="body2" gutterBottom><strong>Station ID:</strong> {selectedProduct?.stationid}</Typography>
      <Typography variant="body2" gutterBottom><strong>Status:</strong> {selectedProduct?.status}</Typography>
      <Typography variant="body2" gutterBottom><strong>Store ID:</strong> {selectedProduct?.store_id}</Typography>
      <Typography variant="body2" gutterBottom><strong>Subcategory:</strong> {selectedProduct?.subcategory}</Typography>
      <Typography variant="body2" gutterBottom><strong>Type:</strong> {selectedProduct?.type}</Typography>
      <Typography variant="body2" gutterBottom><strong>Video:</strong> {selectedProduct?.video}</Typography>
                  <Typography variant="body2" gutterBottom><strong>Weight:</strong> {selectedProduct?.weight}</Typography>
                </div>
                
      </div>
            </>
          )}
        </DialogContent>
        <DialogActions style={{ borderTop: '1px solid #ccc', padding: '0.5rem' }}>
          <Button variant="outlined"  onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleVerifyProduct}>
         {verifyLoading ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={20}  style={{ marginRight: 8 }} />
            Approving...
          </div>
        ) : (
          'Approve'
            )}
          </Button>
        </DialogActions>
      </Dialog>






              {/* component for action menu */}
          <StyledMenu
            id="customized-menu"
            MenuListProps={{
              'aria-labelledby': 'customized-button',
            }}
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleMenuAction('View');
              }}
            >
              <VisibilityIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              View
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();0
                handleMenuAction('Delete');
              }}
            >
              <DeleteIcon sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              Delete
            </MenuItem>
          </StyledMenu>





    </Container>
  );
};

export default ShopApprovalList;
