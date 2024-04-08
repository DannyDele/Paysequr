import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SupportTicketPage from './Support-tickets';
import TicketResponsePage from './Ticket-response';


const HeaderWithMenu = ({ onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState('revenue-overview');

  const handlePageChange = (page) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'support-ticket':
        return <SupportTicketPage />;
      case 'ticket-response':
        return <TicketResponsePage />;
    //   case 'messaging-system':
    //     return <RevenueTrends/>;
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
            <Button onClick={() => handlePageChange('support-ticket')} sx={{ color: 'black' }}>Support Ticket</Button>
            <Button onClick={() => handlePageChange('ticket-response')} sx={{ color: 'black' }}>Ticket Response</Button>
            <Button onClick={() => handlePageChange('messaging-system')} sx={{ color: 'black' }}>Messaging System</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {selectedPage !== 'dashboard' && renderPageContent()}
    </div>
  );
};

export default HeaderWithMenu;
