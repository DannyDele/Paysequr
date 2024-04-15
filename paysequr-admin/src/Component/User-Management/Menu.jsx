import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import UserDatabase from './User-database';
import UserActionPage from './User-actions';
import UserVerificationPage from './User-verification';
import KYCVerificationPage from './KYC-verification';

const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('user-database');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'user-verification':
        return <UserVerificationPage />;
      case 'user-actions':
        return <UserActionPage />;
      case 'user-database':
        return <UserDatabase/>;
        case 'kyc-verification':
        return <KYCVerificationPage/>;
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
            <Button onClick={() => handlePageChange('user-database')} sx={{ color: 'black' }}>User Database</Button>
            <Button onClick={() => handlePageChange('user-actions')} sx={{ color: 'black' }}>User Actions</Button>
            <Button onClick={() => handlePageChange('user-verification')} sx={{ color: 'black' }}>User Verification</Button>
            <Button onClick={() => handlePageChange('kyc-verification')} sx={{ color: 'black' }}>KYC Verification</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default HeaderWithMenu;
