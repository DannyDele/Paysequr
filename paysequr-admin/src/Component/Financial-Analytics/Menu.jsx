import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  BarChartOutlined, // New icon for revenue overview
  ReceiptOutlined, // New icon for revenue breakdown
  TrendingUpOutlined, // New icon for revenue trends
  Menu,
  Close,
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import RevenueOverview from './Revenue-overview';
import RevenueBreakdown from './Revenue-breakdown';
import RevenueTrends from './Revenue-trends';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('revenue-overview'); // Set initial state to 'revenue-overview'

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'revenue-overview':
        return <RevenueOverview />;
      case 'revenue-breakdown':
        return <RevenueBreakdown />;
      case 'revenue-trend':
        return <RevenueTrends />;
      default:
        return null;
    }
  };

  return (
    <main className={show ? 'space-toggle' : null}>
      <aside className={`sidebar ${show ? 'show' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          {show ? <Close style={{ color: '#F36C00', marginLeft: '50px', fontSize: '28px' }} /> : <Menu style={{ color: '#F36C00', marginLeft: '20px', fontSize: '28px' }} />}
        </div>

        {show ? (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>
            <Avatar alt="Paysequr Icon" src={PaysequrIcon} sx={{ width: 30, height: 30, marginRight: '8px' }} />
            <Typography variant='h6' style={{ color: '#F36C00', textAlign: 'center' }}>Paysequr</Typography>
          </div>
        ) : (
          // Display only the image when collapsed
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '25px', marginBottom: '20px' }}>
            <Avatar alt="Paysequr Icon" src={PaysequrIcon} sx={{ width: 30, height: 30, marginRight: '0', marginLeft: '10px' }} />
          </div>
        )}
        <nav className='nav'>
          <div>
            <div className='nav-list'>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button className='nav-link' style={{ marginBottom: '10px' }}>
                  <DashboardOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                  <span className='nav-link-name' style={{ color: 'white' }}>Dashboard</span>
                </Button>
              </Link>
              <Button onClick={() => handlePageChange('revenue-overview')} className={`nav-link ${selectedPage === 'revenue-overview' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <BarChartOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> {/* Use BarChartOutlined for revenue overview */}
                <span className='nav-link-name' style={{ color: 'white' }}>Overview</span>
              </Button>
              <Button onClick={() => handlePageChange('revenue-breakdown')} className={`nav-link ${selectedPage === 'revenue-breakdown' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <ReceiptOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> {/* Use ReceiptOutlined for revenue breakdown */}
                <span className='nav-link-name' style={{ color: 'white' }}>Breakdown</span>
              </Button>
              <Button onClick={() => handlePageChange('revenue-trend')} className={`nav-link ${selectedPage === 'revenue-trend' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <TrendingUpOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> {/* Use TrendingUpOutlined for revenue trends */}
                <span className='nav-link-name' style={{ color: 'white' }}>Trends</span>
              </Button>
            </div>
          </div>
        </nav>
      </aside>
      {/* Render the selected page content */}
      {renderPageContent()}
    </main>
  );
};

export default Sidebar;
