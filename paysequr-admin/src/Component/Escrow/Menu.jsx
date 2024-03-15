import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import TransactionsPage from './Transactions';
import DisputeResolutionPage from './Dispute-resolution';

const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('transactions');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'transactions':
        return <TransactionsPage />;
      case 'dispute-resolution':
        return <DisputeResolutionPage />;
      case 'track-delivery-status':
        return <div>Track Delivery status content goes here</div>;
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
            <Button onClick={() => handlePageChange('transactions')} sx={{ color: 'black' }}>Transactions</Button>
            <Button onClick={() => handlePageChange('dispute-resolution')} sx={{ color: 'black' }}>Dispute Resolution</Button>
            <Button onClick={() => handlePageChange('track-delivery-status')} sx={{ color: 'black' }}>Track Delivery status</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default HeaderWithMenu;
