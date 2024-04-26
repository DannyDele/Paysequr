import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  AttachMoneyOutlined, // Replaced icon for Transaction
  ScheduleOutlined, // Replaced icon for Dispute
  AssignmentTurnedInOutlined, // Replaced icon for Delivery
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';
import OrderPage from './Order-and-transactions';
import PendingListPage from './Pending-list';
import ProductManagementPage from './Product-management';
import Avatar from '@mui/material/Avatar';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('product-management');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'product-management':
        return <ProductManagementPage />;
      case 'pending-list':
        return <PendingListPage />;
      case 'order-and-transactions':
        return <OrderPage/>;
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
              <Button onClick={() => handlePageChange('product-management')} className={`nav-link ${selectedPage === 'transactions' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <AttachMoneyOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
                <span className='nav-link-name' style={{ color: 'white' }}>Management</span>
              </Button>
              <Button onClick={() => handlePageChange('pending-list')} className={`nav-link ${selectedPage === 'dispute-resolution' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <ScheduleOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Pending</span>
              </Button>
              <Button onClick={() => handlePageChange('order-and-transactions')} className={`nav-link ${selectedPage === 'track-delivery-status' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <AssignmentTurnedInOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Orders</span>
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
