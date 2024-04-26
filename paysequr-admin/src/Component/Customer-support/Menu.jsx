import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  SupportOutlined, // Replaced icon for Support Tickets
  AssignmentTurnedIn, // Replaced icon for Ticket Response
  MessageOutlined, // Replaced icon for Messaging System
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';
import SupportTicketPage from './Support-tickets';
import TicketResponsePage from './Ticket-response';
import Avatar from '@mui/material/Avatar';
import MessagingSystem from './Messaging';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('support-ticket');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'support-ticket':
        return <SupportTicketPage />;
      case 'ticket-response':
        return <TicketResponsePage />;
        case 'messaging-system':
          return <MessagingSystem/>;
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
              <Button onClick={() => handlePageChange('support-ticket')} className={`nav-link ${selectedPage === 'categories-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <SupportOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
                <span className='nav-link-name' style={{ color: 'white' }}>Support Tickets</span>
              </Button>
              <Button onClick={() => handlePageChange('ticket-response')} className={`nav-link ${selectedPage === 'categories-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <AssignmentTurnedIn style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
                <span className='nav-link-name' style={{ color: 'white' }}>Ticket Response</span>
              </Button>
              <Button onClick={() => handlePageChange('messaging-system')} className={`nav-link ${selectedPage === 'service-provider-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <MessageOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Messaging System</span>
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
