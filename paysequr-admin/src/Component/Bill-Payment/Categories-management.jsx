import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Edit, Delete, Add } from '@mui/icons-material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCategories, addCategory, deleteCategory, editCategory } from './../../redux/categoriesSlice'; // Import fetchCategories action
import { Snackbar, SnackbarContent, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
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







// useStyles is a function provided by Material-UI's makeStyles hook to define custom styles.
// It creates CSS classes based on the provided theme.
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




const CategoriesManagementPage = () => {
  
 const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
      const classes = useStyles();





  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  // State for new category input and editing
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading

  
  
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
      const [message, setMessage] = useState('');


  
  
  
  // state to manage the action button
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);


  // Function to add a new category
const handleAddCategory = async () => {
  try {
    if (newCategory.trim() !== '') {
      setLoading(true); // Set loading to true when button is clicked
      const msg = await dispatch(addCategory(newCategory));
      console.log('New Category:', newCategory);

      // Update local state with the new category
      setNewCategory(''); // Clear the input field
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




  // Function to edit a category
  const handleEditCategory = async () => {
    try {
      if (newCategory.trim() !== '') {
        setLoading(true); // Set loading to true when button is clicked
       const editedCategory =  await dispatch(editCategory({ categoryId: selectedCategoryId, categoryName: newCategory }));
        setLoading(false);
        setNewCategory(''); // Clear the input field
        setEditMode(false);
        setSelectedCategoryId(null);
        setOpenDialog(false); // Close the dialog after editing
        setSnackbarSeverity('success');
      setSnackbarMessage(editedCategory.payload.msg); // Set the snackbar message
      setSnackbarOpen(true); // Show the snackbar
              console.log('Edited Category:', editedCategory);

      }
    } catch (error) {
      setLoading(false); // Set loading to false if an error occurs
      console.error('Error editing category:', error);
    }
  };

  // Function to delete a category
 const onDeleteCategory = async (categoryId) => {
  try {
    const category = await dispatch(deleteCategory(categoryId)); // Wait for the delete operation to complete
    // Refetch categories after deletion
    // dispatch(fetchCategories());

    // console.log('Category Response:', category);
    const message = category.payload.msg;
    setSnackbarSeverity('success');
    setSnackbarMessage(message); // Set the error message from the server response
    setSnackbarOpen(true);

    console.log('Deleted category:', category); // Log deleted category
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};



// Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
  setOpenDialog(false); // Close the dialog after the snackbar message has been shown
};

  

  


  
  
  // Function to open action menu
  
  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedCategoryId(row.id);
    setSelectedCategory(row);
  };

    // Function to close action menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  



     // *************************************************************
  // function to open action menu for delete or edit a product category
  // *************************************************************
const handleMenuAction = async (action) => {
    handleMenuClose();
    if (action === 'Edit') { 
       setNewCategory(selectedCategory.name);
            setEditMode(true);
            console.log('Selected SubCategory Id for Editing:', selectedCategoryId)
            console.log('Selected SubCategory:', selectedCategory)
            setSelectedCategoryId(selectedCategoryId);
            setOpenDialog(true);
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
        confirmButtonText: 'Yes, delete service category',
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteSubCategory(selectedCategoryId);
          Swal.fire('Deleted!', 'The service category has been deleted.', 'success');
        }
      });
    }
  };
  
  
  



  // Columns configuration for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Category Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
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


  

  return (
    <Container>


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



      <Typography variant="h4" className='text-gray-700'  style={{marginTop:'20px'}} gutterBottom>Service Categories</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => {
          setEditMode(false); // Reset edit mode
          setOpenDialog(true);
        }}
        style={{alignContent:'left',marginBottom:'20px'}}
      >
        Manage Categories
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent style={{paddingTop:'1rem'}}>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={editMode ? handleEditCategory : handleAddCategory}
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : editMode ? 'Save Changes' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={3} style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}


        />
     
      </Paper>
      





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
                handleMenuAction('Edit');
              }}
            >
              <Edit sx={{ margin: '0 .5rem 0 0 ' }} fontSize="small" />
              Edit
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

export default CategoriesManagementPage;
