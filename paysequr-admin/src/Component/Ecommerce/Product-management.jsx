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
   Menu,
  MenuItem,
  CircularProgress,
  IconButton,
  Box,
  Grid,
} from '@mui/material';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Carousel from 'react-elastic-carousel';
import { DataGrid } from '@mui/x-data-grid';
import { styled, alpha } from '@mui/material/styles';
import useStyles from '../../assets/muiStyles/styles'; // Adjust the path based on your actual file structure
import { fetchAllItems, addItem, deleteItem } from './../../redux/itemsSlice'; // Import fetchAllItems action creator
import { fetchAllSubCategories} from './../../redux/subCategoriesSlice'; // Import fetchCategories action
import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import '../../assets/styles/DialogHeader.css'
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';








// StyledMenu is a styled component that customizes the appearance of the Menu component from Material-UI.
// It sets specific styles for the paper, list, and menu item elements within the Menu component.
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



const ProductManagementPage = () => {


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


  // state to manage filtering of category
  const [selectedCategory, setSelectedCategory] = useState(null);


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
      const items = await dispatch(fetchAllItems());
      console.log('Product Items Fetched coming from dispatch:', items)

      await dispatch(fetchAllSubCategories())

    }
    fetch()
    
  }, [dispatch]);




// State for managing the input values of the new category
  const [newCategory, setNewCategory] = useState({
    name: '',
    price: '',
    weight: '',
    description: '',
    inspection_period: '',
    referred_from: '',
    delivery: '',
    sellerid: '',
    brand: '',
    size: '',
    color: '',
    key_features: '',
    reason_for_modification: '',
    image: '',
    images: [],
    video: '',
    location: '',
    stationid: '',
    category: '',
    subcategory: '',
  });
  
  // Function to handle opening the product dialog for editing
 const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenProductDialog(true);
  };

  // Function to handle closing the product dialog
  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    setSelectedProduct(null);
  };

  // Function to handle opening the add category dialog
  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

 // Function to handle closing the add category dialog
  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
    // Reset newCategory state after closing the dialog
    setNewCategory({
      name: '',
      price: '',
      weight: '',
      description: '',
      inspection_period: '',
      referred_from: '',
      delivery: '',
      sellerid: '',
      brand: '',
      size: '',
      color: '',
      key_features: '',
      reason_for_modification: '',
      image: '',
      images: [],
      video: '',
      location: '',
      stationid: '',
      category: '',
      subcategory: '',
    });
  };


  // Function to handle adding a new product category
const handleAddProduct = () => {
  try {
    // Gather all the data from the newCategory state
    const newProductData = { ...newCategory };
    // Log all the data being sent
    console.log('Data being sent:', newProductData);
    // Dispatch the addItem action with the newProductData
    dispatch(addItem(newProductData));
    // Close the add category dialog
    handleCloseAddCategoryDialog();
  } catch (error) {
    console.log('An error occurred', error);
  }
};

  
    // Function to handle delete  new product category
  
  const handleDeleteProduct = async(productId) => {
    try {
      const deletedItem = await dispatch(deleteItem(productId)); // Dispatch the deleteItem action
       // setMessage('Product deleted successfuly!')
      // Show Snackbar with the determined message
      console.log('This is is the item deleted:', deletedItem)
    setSnackbarSeverity('success');
    setSnackbarMessage('Product deleted successfuly!');
    setSnackbarOpen(true);
    } catch (error) {
      console.log('An error occurred', error);
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
      console.log('Selected Product Information to be viewed:', selectedProduct)
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
      field: 'price',
      headerName: 'Price',
       flex: 1,
       renderCell: (params) => (
         <span>&#8358;  
           {params.value}
          </span> 
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
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




  // Function to display images in a carousel
const renderProductImages = () => {
  // Parse the images string into a JavaScript array
  const parsedImages = JSON.parse(selectedProduct?.images || "[]");

  return (
    <Carousel showArrows={false}>
      {parsedImages.map((image, index) => (
        <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '300px', height:'300px', borderRadius: '5px' }} />
      ))}
    </Carousel>
  );
};









  return (
    <div>

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




      <div style={{ marginBottom: '2rem' }}>
         <div className="flex mb-3 items-center justify-between mt-5">
      <Typography variant="h4" className={classes.globalTypography} gutterBottom>
        Product Management
      </Typography>
      <div className="flex" style={{ width: '20%' }}>
 <Autocomplete
  options={subcategories}
  getOptionLabel={(option) => option.name}
  fullWidth
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search by categories"
      variant="outlined"
      fullWidth
    />
  )}
  value={selectedCategory}
  onChange={(event, newValue) => {
    console.log('Category Selected!!', newValue);
    setSelectedCategory(newValue);
  }}
/>
      </div>
    </div>
       
        <div style={{ height: 500, width: '100%' }}>
          
          {loading ? (<CircularProgress sx={{ marginLeft: '40vw', marginTop: '30vh' }} />) : productItems.length === 0 ? (
         
          <Typography>No items available in the store...</Typography>
  
          ) : (

          <DataGrid
  rows={selectedCategory ? productItems.filter(item => item.category === selectedCategory.name) : productItems}
            columns={itemColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            />
             )
            }
        </div>
      </div>

    
      {/* Product Dialog for viewing/editing */}

      <Dialog open={openProductDialog} onClose={handleCloseProductDialog}>
  <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '0.5rem', marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
    {selectedProduct && selectedProduct.name}
  </DialogTitle>
  <DialogContent>
    {selectedProduct && (
      <>
        {renderProductImages()}
        <Typography variant="body1" gutterBottom style={{ marginTop: '1rem' }}>{selectedProduct?.description}</Typography>
        <Typography variant="body2" gutterBottom><strong>Product Id:</strong> {selectedProduct?.id}</Typography>
        <Typography variant="body2" gutterBottom><strong>Seller Id:</strong> {selectedProduct?.sellerid}</Typography>
        <Typography variant="body2" gutterBottom><strong>Station Id:</strong> {selectedProduct?.stationid}</Typography>
        <Typography variant="body2" gutterBottom><strong>Product Name:</strong> {selectedProduct?.name}</Typography>
        <Typography variant="body2" gutterBottom><strong>Price:</strong> ₦{selectedProduct?.price}</Typography>
        <Typography variant="body2" gutterBottom><strong>Quantity:</strong> {selectedProduct?.quantity}</Typography>
        <Typography variant="body2" gutterBottom><strong>Color:</strong> {selectedProduct?.color}</Typography>
        <Typography variant="body2" gutterBottom><strong>Category:</strong> {selectedProduct?.category}</Typography>
        <Typography variant="body2" gutterBottom><strong>Size:</strong> {selectedProduct?.size}</Typography>
        <Typography variant="body2" gutterBottom><strong>Brand:</strong> {selectedProduct?.brand}</Typography>
        <Typography variant="body2" gutterBottom><strong>Type:</strong> {selectedProduct?.type}</Typography>
        <Typography variant="body2" gutterBottom><strong>Weight:</strong> {selectedProduct?.weight}</Typography>
        <Typography variant="body2" gutterBottom><strong>Location:</strong> {selectedProduct?.location}</Typography>
        <Typography variant="body2" gutterBottom><strong>Delivery Information:</strong> {selectedProduct?.delivery}</Typography>
        {/* <Typography variant="body2" gutterBottom><strong>Images:</strong> {selectedProduct?.images}</Typography> */}
        <Typography variant="body2" gutterBottom><strong>Inspection Period:</strong> {selectedProduct?.inspection_period}</Typography>
        <Typography variant="body2" gutterBottom><strong>Key Features:</strong> {selectedProduct?.key_features}</Typography>
        <Typography variant="body2" gutterBottom><strong>Reason for Modification:</strong> {selectedProduct?.reason_for_modification}</Typography>
        <Typography variant="body2" gutterBottom><strong>Referred From:</strong> {selectedProduct?.referred_from}</Typography>
        <Typography variant="body2" gutterBottom><strong>Status:</strong> {selectedProduct?.status}</Typography>
        <Typography variant="body2" gutterBottom><strong>Store Id:</strong> {selectedProduct?.store_id}</Typography>
              <Typography variant="body2" gutterBottom><strong>Subcategory:</strong> {selectedProduct?.subcategory}</Typography>
              <Button
  startIcon={<PlayCircleIcon />}
  variant="contained"
  color="primary"
  onClick={() => window.open(selectedProduct?.video, '_blank')}
  style={{ marginTop: '1rem', marginBottom: '1rem' }}
>
  Play Video
</Button>

      </>
    )}
  </DialogContent>
  <DialogActions style={{ borderTop: '1px solid #ccc', padding: '0.5rem' }}>
    <Button
      startIcon={<CloseIcon style={{ transition: 'transform 0.3s' }} />}
      variant="contained"
      onClick={handleCloseProductDialog}
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



      
      </div>
  );
};

export default ProductManagementPage;
