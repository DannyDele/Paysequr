import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CustomReports from './Custom-reports';
import TransactionLog from './Transaction-log';
import UserActivityLogPage from './User-activity-log';
const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('custom-reports');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'custom-reports':
        return <CustomReports />;
      case 'transaction-logs':
        return <TransactionLog />;
      case 'user-activity':
        return <UserActivityLogPage/>;
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
            <Button onClick={() => handlePageChange('custom-reports')} sx={{ color: 'black' }}>Custom Reports</Button>
            <Button onClick={() => handlePageChange('transaction-logs')} sx={{ color: 'black' }}>Transaction Logs</Button>
            <Button onClick={() => handlePageChange('user-activity')} sx={{ color: 'black' }}>User Activity Logs</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default HeaderWithMenu;
