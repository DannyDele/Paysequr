import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import OrderPage from './Order-and-transactions';
import PendingListPage from './Pending-list';
import ProductManagementPage from './Product-management';

const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('product-management');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'product-management':
        return <ProductManagementPage />;
      case 'pending-list':
        return <PendingListPage />;
      case 'order-and-transactions':
        return <OrderPage/>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <ButtonGroup variant="text" color="inherit" aria-label="menu">
            {/* Use Link component for the Dashboard button */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'black' }}>Dashboard</Button>
            </Link>
            <Button onClick={() => handlePageChange('product-management')} sx={{ color: 'black' }}>Product Management</Button>
            <Button onClick={() => handlePageChange('pending-list')} sx={{ color: 'black' }}>Pending List</Button>
            <Button onClick={() => handlePageChange('order-and-transactions')} sx={{ color: 'black' }}>Order and Transactions</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default HeaderWithMenu;
