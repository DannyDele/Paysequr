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
  CircularProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import { fetchCategories, addCategory, deleteCategory, editCategory } from './../../redux/categoriesSlice'; // Import fetchCategories action


const CategoriesManagementPage = () => {
  
 const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

// Assuming categories is an array of objects
const modifiedCategories = categories.map((category, index) => ({
  id: index + 1, // Generate a unique identifier for each row
  name: category.name // Assuming 'name' is the name of your category property
}));


  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  // State for new category input and editing
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading





  // Function to add a new category
const handleAddCategory = async () => {
  try {
    if (newCategory.trim() !== '') {
      setLoading(true); // Set loading to true when button is clicked
      dispatch(addCategory(newCategory));
      console.log('New Caterory:', newCategory)
        // setLoading(false);

     
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
        dispatch(editCategory({ categoryId: selectedCategoryId, categoryName: newCategory }));
        // setLoading(false);
        // setNewCategory(''); // Clear the input field
        // setEditMode(false);
        // setSelectedCategoryId(null);
        // setOpenDialog(false); // Close the dialog after editing
      }
    } catch (error) {
      setLoading(false); // Set loading to false if an error occurs
      console.error('Error editing category:', error);
    }
  };

  // Function to delete a category
  const onDeleteCategory = async (categoryId) => {
    try {
      dispatch(deleteCategory(categoryId));
      // Refetch categories after deletion
      dispatch(fetchCategories());
    } catch (error) {
      console.error('Error deleting category:', error);
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
        <span>
          <IconButton style={{color:'blue'}} onClick={() => {
            setNewCategory(params.row.name);
            setEditMode(true);
            setSelectedCategoryId(params.row.id);
            setOpenDialog(true);
          }}>
            <Edit />
          </IconButton>
          <IconButton style={{color:'red'}} onClick={() => onDeleteCategory(params.row.id)}>
            <Delete />
          </IconButton>
        </span>
      ),
    },
  ];


  

  return (
    <Container>
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
        <DialogContent>
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
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
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
          rows={modifiedCategories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}


        />
     
    </Paper>
    </Container>
  );
};

export default CategoriesManagementPage;
