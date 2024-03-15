import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';

const CategoriesManagementPage = () => {
  // Dummy data for categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Airtime' },
    { id: 2, name: 'Data' },
    { id: 3, name: 'Electricity' },
    { id: 4, name: 'TV' },
    { id: 5, name: 'Education' },
    { id: 6, name: 'Religion' },
    { id: 7, name: 'Government' },
    { id: 8, name: 'Water' },
    { id: 9, name: 'Travel' },
    { id: 10, name: 'Hotel' },
    { id: 11, name: 'Others' },
  ]);

  // State for new category input and editing
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Function to add a new category
  const addCategory = () => {
    if (newCategory.trim() !== '') {
      const newCategoryId = categories.length + 1;
      setCategories([...categories, { id: newCategoryId, name: newCategory }]);
      setNewCategory('');
      setOpenDialog(false);
    }
  };

  // Function to edit a category
  const editCategory = () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = categories.map(category =>
        category.id === selectedCategoryId ? { ...category, name: newCategory } : category
      );
      setCategories(updatedCategories);
      setNewCategory('');
      setEditMode(false);
      setSelectedCategoryId(null);
    }
  };

  // Function to delete a category
  const deleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
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
          <IconButton onClick={() => {
            setNewCategory(params.row.name);
            setEditMode(true);
            setSelectedCategoryId(params.row.id);
            setOpenDialog(true);
          }}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteCategory(params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Service Categories</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setOpenDialog(true)}
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
            onClick={editMode ? editCategory : addCategory}
            color="primary"
            variant="contained"
          >
            {editMode ? 'Save Changes' : 'Add'}
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
     
    </Container>
  );
};

export default CategoriesManagementPage;
