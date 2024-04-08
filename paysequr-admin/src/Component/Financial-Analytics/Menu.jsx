import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import RevenueOverviewPage from './Revenue-overview';
import RevenueBreakdown from './Revenue-breakdown';
import RevenueTrends from './Revenue-trends';

const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('revenue-overview');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'revenue-overview':
        return <RevenueOverviewPage />;
      case 'revenue-breakdown':
        return <RevenueBreakdown />;
      case 'revenue-trends':
        return <RevenueTrends/>;
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
            <Button onClick={() => handlePageChange('revenue-overview')} sx={{ color: 'black' }}>Revenue Overview</Button>
            <Button onClick={() => handlePageChange('revenue-breakdown')} sx={{ color: 'black' }}>Revenue Breakdown</Button>
            <Button onClick={() => handlePageChange('revenue-trends')} sx={{ color: 'black' }}>Revenue Trends</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default HeaderWithMenu;
