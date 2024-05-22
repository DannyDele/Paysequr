import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  Announcement as AnnouncementIcon, // Changed icon for Announcements
  Notifications as NotificationsOutlined, // Changed icon for Pop Notification
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import PopNotificationPage from './Pop-notification';
import AnnouncementPage from './Announce';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('main-announcement');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'main-announcement':
        return <AnnouncementPage />;
      case 'pop-notification':
        return <PopNotificationPage />;
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
              <Button onClick={() => handlePageChange('main-announcement')} className={`nav-link ${selectedPage === 'main-announcement' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <AnnouncementIcon style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Announcements</span>
              </Button>
              <Button onClick={() => handlePageChange('pop-notification')} className={`nav-link ${selectedPage === 'pop-notification' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <NotificationsOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Pop Notification</span>
              </Button>
            </div>
          </div>
        </nav>
      </aside>
      {renderPageContent()}
    </main>
  );
};

export default Sidebar;
