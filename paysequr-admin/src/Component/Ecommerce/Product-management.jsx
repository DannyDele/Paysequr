import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ProductManagementPage = () => {
  // Dummy data for product categories
  const [productCategories, setProductCategories] = useState([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    // Add more categories as needed
  ]);

  // State for managing the input value of the new category name
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // State for managing the selected product for editing
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  // Function to handle opening the product dialog for editing
  const handleEditProduct = (product) => {
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
    setNewCategoryName('');
  };

  // Function to handle adding a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      const newCategory = {
        id: productCategories.length + 1, // Generate a unique id
        name: newCategoryName.trim()
      };
      setProductCategories([...productCategories, newCategory]);
    }
    handleCloseAddCategoryDialog();
  };

  // Columns configuration for product categories table
  const categoryColumns = [
    {
      field: 'name',
      headerName: 'Category Name',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditProduct(params.row)}>View</Button>
      ),
    },
  ];

  return (
    <Container>
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h5" className='text-gray-700'style={{marginTop:'20px'}} gutterBottom>Product Categories</Typography>
       
        <Button variant="outlined" color="primary" style={{ marginRight: '1rem',marginTop:'10px' }} onClick={handleOpenAddCategoryDialog}>Add Product Category</Button>
 <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={productCategories}
            columns={categoryColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Add Product Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCategoryDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddCategory} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Product Dialog for editing */}
      <Dialog open={openProductDialog} onClose={handleCloseProductDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              {/* Editable fields */}
              <TextField
                label="Product Name"
                defaultValue={selectedProduct ? selectedProduct.productName : ''}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Username"
                defaultValue={selectedProduct ? selectedProduct.username : ''}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Category"
                defaultValue={selectedProduct ? selectedProduct.category : ''}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                defaultValue={selectedProduct ? selectedProduct.price : ''}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductDialog} color="primary">Cancel</Button>
          <Button onClick={handleCloseProductDialog} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagementPage;
