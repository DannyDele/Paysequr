import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';import {
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
  Paper,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import { fetchAllItems, addItem, deleteItem } from './../../redux/itemsSlice'; // Import fetchAllItems action creator
import { Snackbar, SnackbarContent,  Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';
import { fetchAllSubCategories, addSubCategories, deleteSubCategory } from './../../redux/subCategoriesSlice'; // Import fetchCategories action





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
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));









function ProductCategories() {
   // Redux state for product items
  const subCategories = useSelector((state) => state.subcategories.subcategories); // Adjusted selector
  const loadingSubCategories = useSelector((state) => state.subcategories.loading); // Adjusted selector

  const dispatch = useDispatch();
  const classes = useStyles();





  // Fetch categories on component mount
  useEffect(() => {
      const subCategories = dispatch(fetchAllSubCategories());
      console.log('All Sub Categories:', subCategories)
  }, [dispatch]);
    
    
    
     // State for new category input and editing
  const [newSubCategory, setNewSubCategory] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null); // New state for category image
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false)
    const [editMode, setEditMode] = useState(false);
        const [loading, setLoading] = useState(false); // State to manage loading


    
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
      const [message, setMessage] = useState('');




  // Function to add a new category
const handleAddSubCategory = async () => {
  try {
    if (newSubCategory.trim() !== '') {
      setLoading(true); // Set loading to true when button is clicked
      const msg = await dispatch(addSubCategories(newSubCategory));
      console.log('New Category:', newSubCategory);

      // Update local state with the new category
      setNewSubCategory(''); // Clear the input field
      setLoading(false); // Set loading to false
      setOpenDialog(false); // Close the dialog
      setSnackbarSeverity('success');
      setSnackbarMessage(msg.payload.msg); // Set the snackbar message
      setSnackbarOpen(true); // Show the snackbar

      // // Fetch categories again to update the DataGrid
      // dispatch(fetchCategories());
    }
  } catch (error) {
    setLoading(false); // Set loading to false if an error occurs
    console.error('Error adding category:', error);
  }
};


  
  const handleDeleteSubCategory = async (subcategoryId) => {
try {
    const subcategory = await dispatch(deleteSubCategory(subcategoryId)); // Wait for the delete operation to complete

    // console.log('Category Response:', category);
    const message = subcategory.payload.msg;
    setSnackbarSeverity('success');
    setSnackbarMessage(message); // Set the error message from the server response
    setSnackbarOpen(true);

    console.log('Deleted subcategory:', subcategory); // Log deleted category
  } catch (error) {
    console.error('Error deleting subcategory:', error);
  }
  }
    
    
    
      // Function to edit a category
  const handleEditCategory = async () => {
    // try {
    //   if (newSubCategory.trim() !== '') {
    //     setLoading(true); // Set loading to true when button is clicked
    //    const editedCategory =  await dispatch(editCategory({ categoryId: selectedCategoryId, categoryName: newSubCategory }));
    //     setLoading(false);
    //     setNewSubCategory(''); // Clear the input field
    //     setEditMode(false);
    //     setSelectedCategoryId(null);
    //     setOpenDialog(false); // Close the dialog after editing
    //     setSnackbarSeverity('success');
    //   setSnackbarMessage(editedCategory.payload.msg); // Set the snackbar message
    //   setSnackbarOpen(true); // Show the snackbar
    //           console.log('Edited Category:', editedCategory);

    //   }
    // } catch (error) {
    //   setLoading(false); // Set loading to false if an error occurs
    //   console.error('Error editing category:', error);
    // }
  };




    // Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
  setOpenDialog(false); // Close the dialog after the snackbar message has been shown
};

  



  // Columns configuration for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Sub-Category Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <span>
          <IconButton style={{color:'blue'}} onClick={() => {
            setNewSubCategory(params.row.name);
            setEditMode(true);
            console.log('Selected SubCategory Id for Editing:', params.row.id)
            setSelectedCategoryId(params.row.id);
            setOpenDialog(true);
          }}>
            <Edit />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => {
            console.log('ID Selceted is:', params.row.id)
            handleDeleteSubCategory(params.row.id)
          }
            }>
            <Delete />
          </IconButton>
        </span>
      ),
    },
  ];


  
    
    


  return (
      <Container style={{ marginTop: '1rem' }}>
          




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

    <Typography variant="h5" className='text-gray-700'style={{marginTop:'20px'}} gutterBottom>Product Categories</Typography>

          <Button
            startIcon={<Add />} 
            variant="contained"
            color="primary"
              style={{ alignContent: 'left', marginBottom: '20px' }}
               onClick={() => {
          setEditMode(false); // Reset edit mode
          setOpenDialog(true);
        }}

          >
              Add Product Category
          </Button>


          {/* Dialog for adding sub categories */}

          <Dialog open={openDialog}  onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent style={{paddingTop:'1rem'}}>
          <TextField
            label="category name"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
       <div className={classes.uploadButton}>
            <input
              accept="image/*"
              className={classes.input}
              id="upload-image"
              type="file"
              onChange={(e) => setNewCategoryImage(e.target.files[0])}
            />
            <label htmlFor="upload-image">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <UploadFileIcon />
              </IconButton>
              {newCategoryImage ? newCategoryImage.name : 'Upload Category Image'}
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={editMode ? handleEditCategory : handleAddSubCategory}
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : editMode ? 'Save Changes' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

          

 
          <Paper elevation={3} style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
              
                   { loadingSubCategories ? (<CircularProgress sx={{marginLeft:'40vw', marginTop: '30vh'}}/>) : (

        <DataGrid
          rows={subCategories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}

                  />
                              )
     }
              </Paper>
                          
     

      </Container>
  )
}

export default ProductCategories