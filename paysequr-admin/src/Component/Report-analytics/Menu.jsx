import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  AssessmentOutlined, // Import icon for custom reports
  DescriptionOutlined, // Import icon for transaction logs
  PersonOutlineOutlined, // Import icon for user activity
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import CustomReports from './Custom-reports';
import TransactionLog from './Transaction-log';
import UserActivityLogPage from './User-activity-log';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('custom-reports'); // Set initial state to 'app-setting'

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'custom-reports':
        return <CustomReports />;
      case 'transaction-logs':
        return <TransactionLog />;
      case 'user-activity':
        return <UserActivityLogPage />;
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
              <Button onClick={() => handlePageChange('custom-reports')} className={`nav-link ${selectedPage === 'custom-reports' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <AssessmentOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> {/* Use AssessmentOutlined for custom reports */}
                <span className='nav-link-name' style={{ color: 'white' }}>Reports</span>
              </Button>
              <Button onClick={() => handlePageChange('transaction-logs')} className={`nav-link ${selectedPage === 'transaction-logs' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <DescriptionOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> {/* Use DescriptionOutlined for transaction logs */}
                <span className='nav-link-name' style={{ color: 'white' }}>Transactions</span>
              </Button>
              <Button onClick={() => handlePageChange('user-activity')} className={`nav-link ${selectedPage === 'user-activity' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <PersonOutlineOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> {/* Use PersonOutlineOutlined for user activity */}
                <span className='nav-link-name' style={{ color: 'white' }}>User Activity</span>
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
