import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CategoriesManagementPage from './Categories-management';
import ServiceProviderPage from './Service-provider-management';
import PaymentTransactionPage from './Payment-transactions';
const Menu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('categories-management');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'categories-management':
        return <CategoriesManagementPage />;
      case 'service-provider-management':
        return <ServiceProviderPage />;
      case 'payment-transactions':
        return <PaymentTransactionPage/>;
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
            <Button onClick={() => handlePageChange('categories-management')} sx={{ color: 'black' }}>Categories Management</Button>
            <Button onClick={() => handlePageChange('service-provider-management')} sx={{ color: 'black' }}>Service Provider Management</Button>
            <Button onClick={() => handlePageChange('payment-transactions')} sx={{ color: 'black' }}>Payment Transaction</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default Menu;
