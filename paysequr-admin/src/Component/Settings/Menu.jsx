import React, { useState } from 'react';
import './index.css';
import { Typography, Button } from '@mui/material';
import {
  DashboardOutlined,
  SettingsOutlined,
  SecurityOutlined,
  NotificationsOutlined,
  Menu,
  Close,
} from '@mui/icons-material';
import AppSetting from './App-setting'; // Import AppSetting component
import SecuritySetting from './Security-setting';
import NotificationPreference from './Notification-preference';

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
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          {show ? <Close style={{ color: '#F36C00' }} /> : <Menu style={{ color: '#F36C00' }} />}
        </div>
        <Typography style={{ color: 'white', marginRight: '550px' }}>Settings</Typography>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <Typography variant='h6' style={{ color: '#F36C00', textAlign: 'center', marginTop: '60px', marginBottom: '20px' }}>Paysequr</Typography>
        <nav className='nav'>
          <div>
            <div className='nav-list'>
              <Button onClick={() => handlePageChange('dashboard')} className={`nav-link ${selectedPage === 'dashboard' ? 'active' : ''}`}>
                <DashboardOutlined style={{ color: '#F36C00' }} className='nav-link-icon' />
                <span className='nav-link-name'>Dashboard</span>
              </Button>
              <Button onClick={() => handlePageChange('app-setting')} className={`nav-link ${selectedPage === 'app-setting' ? 'active' : ''}`}>
                <SettingsOutlined style={{ color: '#F36C00' }} className='nav-link-icon' />
                <span className='nav-link-name'>App Setting</span>
              </Button>
              <Button onClick={() => handlePageChange('security-setting')} className={`nav-link ${selectedPage === 'security-setting' ? 'active' : ''}`}>
                <SecurityOutlined style={{ color: '#F36C00' }} className='nav-link-icon' />
                <span className='nav-link-name'>Security Setting</span>
              </Button>
              <Button onClick={() => handlePageChange('notification-preference')} className={`nav-link ${selectedPage === 'notification-preference' ? 'active' : ''}`}>
                <NotificationsOutlined style={{ color: '#F36C00' }} className='nav-link-icon' />
                <span className='nav-link-name'>Notification Preference</span>
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
