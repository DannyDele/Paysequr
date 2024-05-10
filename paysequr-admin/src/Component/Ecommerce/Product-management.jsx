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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import { fetchAllItems, addItem, deleteItem } from './../../redux/itemsSlice'; // Import fetchAllItems action creator
import { fetchAllSubCategories} from './../../redux/subCategoriesSlice'; // Import fetchCategories action

import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import '../../assets/styles/DialogHeader.css'
import Autocomplete from '@mui/material/Autocomplete';





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


const ProductManagementPage = () => {


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
      dispatch(fetchAllSubCategories())

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
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <span>
        <IconButton style={{color:'blue'}} onClick={() => handleViewProduct(params.row)}>
            <Edit />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteProduct(params.row.id)}>
          <Delete />
          </IconButton>

          
          </span>
      ),
    },
  ];

// Recursive function to render form fields with custom labels
const renderFormFields = (data, parentKey = '') => {
  // Mapping object for custom labels
  const customLabels = {
    id: 'ID',
    name: 'Name',
    price: 'Price',
    weight: 'Weight',
    description: 'Description',
    inspection_period: 'Inspection Period',
    referred_from: 'Referred From',
    delivery: 'Delivery',
    sellerid: 'Seller ID',
    brand: 'Brand',
    size: 'Size',
    color: 'Color',
    key_features: 'Key Features',
    reason_for_modification: 'Reason for Modification',
    video: 'Video',
    location: 'Location',
    stationid: 'Station ID',
    category: 'Category',
    subcategory: 'Subcategory',
    // Add more custom labels as needed
  };

  // Move image and images labels to the end
  const orderedLabels = Object.keys(data)
    .filter(key => key !== 'image' && key !== 'images')
    .concat(['image', 'images']);

  return orderedLabels.map((key) => {
    const label = customLabels[key] || key.replace(/_/g, ' ').toUpperCase();
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      return renderFormFields(value, key);
    }

    if (key === 'image') {
      return (

    <div key={parentKey ? `${parentKey}-${key}` : key}> {/* Add key prop here */}
  {/* Typography header for product images */}
      <Typography  className='Dialog-title-header' style={{ marginTop:'1rem' }} variant="h6" gutterBottom>
        Product Images
          </Typography>
      
          <div key={parentKey ? `${parentKey}-${key}` : key}>
          <label>{label}</label>
          <img src={value} alt="Product Image" />
          </div>
          </div>
      );
    }

    if (key === 'images' && Array.isArray(value)) { // Check if value is an array
      return (
          
        <div key={parentKey ? `${parentKey}-${key}` : key}>
          <label>{label}</label>
          {value.map((image, index) => (
            <img key={index} src={image} alt={`Product Image ${index + 1}`} />
          ))}
        </div>
      );
    }

    if (key === 'images') { // Handle non-array case
      return (

        
        <div key={parentKey ? `${parentKey}-${key}` : key}>
          <label>{label}</label>
          <img src={value} alt={`Product Image`} />
        </div>
      );
    }

    return (
      <TextField
        key={parentKey ? `${parentKey}-${key}` : key}
        label={label}
        value={value}
        fullWidth
        margin="normal"
      />
    );
  });
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




      <div style={{ marginBottom: '2rem' }}>
         <div className="flex mb-3 items-center justify-between mt-5">
      <Typography variant="h5" className='text-gray-700' gutterBottom>
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
          value={subcategories.find(subcategory => subcategory.id === selectedProduct) || null}
          onChange={(event, newValue) => {
            console.log('Category Selected!!', newValue.id)
            setSelectedProduct(newValue.id);
          }}
        />
      </div>
    </div>
       
        <div style={{ height: 300, width: '100%' }}>
          
          { loading ? (<CircularProgress sx={{marginLeft:'40vw', marginTop: '30vh'}}/>) : (

          <DataGrid
            rows={productItems}
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
  <DialogTitle  className='Dialog-title-header'>View Product</DialogTitle>
  <DialogContent>
    {selectedProduct && (
      <>
        {/* Render form fields */}
        {renderFormFields(selectedProduct)} {/* Remove customLabels parameter */}
      </>
    )}
  </DialogContent>
  <DialogActions>
          
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

      
          </Container>
  );
};

export default ProductManagementPage;
