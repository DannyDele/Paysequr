import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  SettingsOutlined,
  SecurityOutlined,
  NotificationsOutlined,
  Menu,
  Close,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';
import AppSetting from './App-setting'; // Import AppSetting component
import SecuritySetting from './Security-setting';
import NotificationPreference from './Notification-preference';
import Avatar from '@mui/material/Avatar';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('app-setting'); // Set initial state to 'app-setting'

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'app-setting':
        return <AppSetting />;
      case 'security-setting':
        return <SecuritySetting />;
      case 'notification-preference':
        return <NotificationPreference />;
      default:
        return null;
    }
  };

  return (
    <main className={show ? 'space-toggle' : null}>
      <aside className={`sidebar ${show ? 'show' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          {show ? <Close style={{ color: '#F36C00', marginLeft: '50px',fontSize: '28px' }} /> : <Menu style={{ color: '#F36C00', marginLeft: '20px', fontSize: '28px' }} />}
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
                  <DashboardOutlined style={{ color: '#F36C00',fontSize: '28px' }} className='nav-link-icon' />
                  <span className='nav-link-name' style={{ color: 'white' }}>Dashboard</span>
                </Button>
              </Link>
              <Button onClick={() => handlePageChange('app-setting')} className={`nav-link ${selectedPage === 'app-setting' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <SettingsOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>App Setting</span>
              </Button>
              <Button onClick={() => handlePageChange('security-setting')} className={`nav-link ${selectedPage === 'security-setting' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <SecurityOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Security </span>
              </Button>
              <Button onClick={() => handlePageChange('notification-preference')} className={`nav-link ${selectedPage === 'notification-preference' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <NotificationsOutlined style={{ color: '#F36C00', fontSize: '35px', marginLeft:'0' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Notification </span>
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
