import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';import {
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
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
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


const ProductManagementPage = () => {


  // Redux state for product items
  const productItems = useSelector((state) => state.items.items);
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
    dispatch(fetchAllItems());
  }, [dispatch]);




  // State for managing the input value of the new category name
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
  
  const handleDeleteProduct = (productId) => {
    try {
      dispatch(deleteItem(productId)); // Dispatch the deleteItem action
       // setMessage('Product deleted successfuly!')
      // Show Snackbar with the determined message
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
      headerName: 'ID',
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
    image: 'Image',
    images: 'Images',
    video: 'Video',
    location: 'Location',
    stationid: 'Station ID',
    category: 'Category',
    subcategory: 'Subcategory',
    // Add more custom labels as needed
  };

  return Object.keys(data).map((key) => {
    const label = customLabels[key] || key.replace(/_/g, ' ').toUpperCase();
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      return renderFormFields(value, key);
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
        <Typography variant="h5" className='text-gray-700'style={{marginTop:'20px'}} gutterBottom>Product Categories</Typography>
       
        <Button variant="outlined" color="primary" style={{ marginRight: '1rem',marginTop:'10px' }} onClick={handleOpenAddCategoryDialog}>Add Product Category</Button>
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

      {/* Add Category Dialog */}
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Add Product Category</DialogTitle>
          <DialogContent>
          {/* Input fields for each property */}
          <TextField
            label="Name"
            value={newCategory.name || ''}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Price"
            value={newCategory.price || ''}
            onChange={(e) => setNewCategory({ ...newCategory, price: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Weight"
            value={newCategory.weight || ''}
            onChange={(e) => setNewCategory({ ...newCategory, weight: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Description"
            value={newCategory.description || ''}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Inspection Period"
            value={newCategory.inspection_period || ''}
            onChange={(e) => setNewCategory({ ...newCategory, inspection_period: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Referred From"
            value={newCategory.referred_from || ''}
            onChange={(e) => setNewCategory({ ...newCategory, referred_from: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Delivery"
            value={newCategory.delivery || ''}
            onChange={(e) => setNewCategory({ ...newCategory, delivery: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Seller ID"
            value={newCategory.sellerid || ''}
            onChange={(e) => setNewCategory({ ...newCategory, sellerid: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Brand"
            value={newCategory.brand || ''}
            onChange={(e) => setNewCategory({ ...newCategory, brand: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Size"
            value={newCategory.size || ''}
            onChange={(e) => setNewCategory({ ...newCategory, size: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Color"
            value={newCategory.color || ''}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <TextField
            label="Key Features"
            value={newCategory.key_features || ''}
            onChange={(e) => setNewCategory({ ...newCategory, key_features: e.target.value })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <Input
            type="file"
            onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
          />
          <Input
            type="file"
            onChange={(e) => setNewCategory({ ...newCategory, images: e.target.files })}
            fullWidth
  margin="dense" // Change "normal" to "dense"
            multiple
          />
         <TextField
  select
  label="Category"
  value={newCategory.category || ''}
  onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
  fullWidth
  margin="dense"
>
  <MenuItem value="Category 1">Category 1</MenuItem>
  <MenuItem value="Category 2">Category 2</MenuItem>
</TextField>
<TextField
  select
  label="Subcategory"
  value={newCategory.subcategory || ''}
  onChange={(e) => setNewCategory({ ...newCategory, subcategory: e.target.value })}
  fullWidth
  margin="dense"
>
  <MenuItem value="Subcategory 1">Subcategory 1</MenuItem>
  <MenuItem value="Subcategory 2">Subcategory 2</MenuItem>
</TextField>

          {/* Add more input fields for other properties as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCategoryDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddProduct} color="primary">{loading ? <CircularProgress size={24} color="inherit" /> : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Product Dialog for viewing/editing */}

<Dialog open={openProductDialog} onClose={handleCloseProductDialog}>
  <DialogTitle>View Product</DialogTitle>
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
