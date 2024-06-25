import React, { useState } from 'react';
// import { HourglassEmpty, HelpOutline, CheckCircle } from '@mui/icons-material'; // Import icons for different verification statuses
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
  IconButton
} from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import ProductManagementPage from './Product-management';
import ProductCategories from './Product-categories';


function Product() {
     const [showProductManagement, setShowProductManagement] = useState(true);

  const handleViewAllProductsClick = () => {
    setShowProductManagement(true);
  };

  const handleProductCategoriesClick = () => {
    setShowProductManagement(false);
  };

    
    
  return (
    <Container>
    <div>
      <div style={{ marginTop: '20px'}}>
        {/* Button for viewing all products */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ProductionQuantityLimitsIcon />}
          style={{ height: '40px', marginRight:'1rem' }}
          onClick={handleViewAllProductsClick}
        >
          View All Products
        </Button>

        {/* Button for viewing product categories */}
        <Button
          variant="outlined"
          color="warning"
          startIcon={<CategoryIcon />}
          style={{ height: '40px' }}
          onClick={handleProductCategoriesClick}
        >
          Product Categories
        </Button>
      </div>

      {/* Conditionally render either ProductManagementPage or ProductCategories */}
      {showProductManagement ? <ProductManagementPage /> : <ProductCategories />}
      </div>
      </Container>
  );
}

export default Product