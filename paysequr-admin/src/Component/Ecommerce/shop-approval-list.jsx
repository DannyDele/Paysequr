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
import { fetchAllShop, verifyShop } from '../../redux/shopSlice'; // Import fetchAllItems action creator
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






const ShopItemsList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Redux state for product items
  const shop = useSelector((state) => state.shop.shop);
  // const subcategories = useSelector((state) => state.subcategories.subcategories);
    const loading = useSelector((state) => state.shop.loading); // Access loading state

  const dispatch = useDispatch();
  const classes = useStyles();


  // State for managing the selected product for viewing
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState('');
  const [openShopDialog, setOpenShopDialog] = useState(false);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);



  
  // state to manage the action button
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
      const [message, setMessage] = useState('');


  
  // Local loading state for verifyShop action
  const [verifyLoading, setVerifyLoading] = useState(false);



  // Fetch all items from the API when component mounts
  useEffect(() => {
    const fetch = async () => {
      const allShop = await dispatch(fetchAllShop());
      console.log('All Shop coming from dispatch:', allShop)
      // dispatch(fetchAllSubCategories())

    }
    fetch()
    
  }, [dispatch]);




   // Function to handle opening the shop dialog for editing
 const handleViewShop = (shop) => {
    setSelectedShop(shop);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  // function to verify a users shop
  const handleVerifyShop  = async () => {
    // Logic to approve the selected shop
    // This can include updating the shop status in the database, sending notifications, etc.
     setVerifyLoading(true);
    try {
      const verifyShopResponse = await dispatch(verifyShop(selectedShopId)).unwrap();
      const verifyMessage = verifyShopResponse.msg && 'Store approved successfully';

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
    setSelectedShopId(row.id);
    setSelectedShop(row);
  };

    // Function to close action menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  



  
   // *************************************************************
  // function to open action menu for delete or view a shop
  // *************************************************************
const handleMenuAction = async (action) => {
    handleMenuClose();
    if (action === 'View') { 
      handleViewShop(selectedShop);
      setSelectedShopId(selectedShop.id)
      setOpenShopDialog(true);
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
        confirmButtonText: 'Yes, delete shop',
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteShop(selectedShopId);
          Swal.fire('Deleted!', 'The shop has been deleted.', 'success');
        }
      });
    }
  };
  
  
  

  // Columns configuration for shop categories table
const shopColumns = [
    {
      field: 'id',
      headerName: 'Shop Id',
      flex: .5,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'location',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Merchant Status',
      flex: 1,
      renderCell: (params) => (
         <span>
          {params.value}
          {params.value === 'verified' ? (
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









  const renderShopImages = () => {

   
    return (
      <img src={selectedShop.image} alt={selectedShop.description} style={{
        width: '60%',
        borderRadius: '5px'
      }} />


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


  
      
        <Typography variant="h4" className='text-gray-700' style={{ marginTop: '20px' }} gutterBottom>Shop Approval List</Typography>
        
      

      {loading ? (
      <CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />
      ) : shop.length === 0 ? (
         
          <Typography>No shop available in the store...</Typography>
  
          ) 
        : (
           <div style={{ height: 500, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          // rows={pendingList}
          rows={shop}
            columns={shopColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
     )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '0.5rem',marginBottom:'20px', borderBottom: '1px solid #ccc' }}>{selectedShop && selectedShop.name} shop</DialogTitle>
        <DialogContent>
          {selectedShop && (
            <>
              <div className='text-center flex justify-center'>
                {renderShopImages()}
                  </div>
              <Typography variant="body1" gutterBottom style={{ marginTop: '1rem' }}>{selectedShop?.description}</Typography>
              <Typography variant="body2" gutterBottom><strong>Shop ID:</strong> {selectedShop?.id}</Typography>
              <Typography variant="body2" gutterBottom><strong>User ID:</strong> {selectedShop?.user_id}</Typography>
              <Typography variant="body2" gutterBottom><strong>Name:</strong> {selectedShop?.name}</Typography>
              <Typography variant="body2" gutterBottom><strong>Username:</strong> {selectedShop?.username}</Typography>
              <Typography variant="body2" gutterBottom><strong>Location:</strong> {selectedShop?.location}</Typography>
              <Typography variant="body2" gutterBottom><strong>Time Created:</strong> {selectedShop?.created_at}</Typography>
              <Typography variant="body2" gutterBottom><strong>Time Updated:</strong> {selectedShop?.updated_at}</Typography>
              <Typography variant="body2" gutterBottom><strong>Status:</strong> {selectedShop?.status}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions style={{ borderTop: '1px solid #ccc', padding: '0.5rem' }}>
          <Button variant="outlined" onClick={handleCloseDialog}>Close</Button>
           <Button variant="contained" color="primary" onClick={handleVerifyShop} disabled={verifyLoading}>
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

export default ShopItemsList;
