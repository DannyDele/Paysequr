import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  MonetizationOnOutlined, // New icon for Transaction
  GavelOutlined, // New icon for Dispute
  LocalShippingOutlined, // New icon for Delivery
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';
import TransactionsPage from './Transactions';
import DisputeResolutionPage from './Dispute-resolution';
import TrackDeliveryStatusPage from './Delivery-status';

import Avatar from '@mui/material/Avatar';


const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('transactions'); // Set initial state to 'app-setting'

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'transactions':
        return <TransactionsPage />;
      case 'dispute-resolution':
        return <DisputeResolutionPage />;
      case 'track-delivery-status':
        return <TrackDeliveryStatusPage/>;
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
              <Button onClick={() => handlePageChange('transactions')} className={`nav-link ${selectedPage === 'transactions' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <MonetizationOnOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
                <span className='nav-link-name' style={{ color: 'white' }}>Transaction</span>
              </Button>
              <Button onClick={() => handlePageChange('dispute-resolution')} className={`nav-link ${selectedPage === 'dispute-resolution' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <GavelOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Dispute</span>
              </Button>
              <Button onClick={() => handlePageChange('track-delivery-status')} className={`nav-link ${selectedPage === 'track-delivery-status' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <LocalShippingOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Delivery</span>
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
