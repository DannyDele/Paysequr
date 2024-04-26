
import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  AccountBalanceOutlined, // Replaced icon for Categories Management
  BusinessOutlined, // Replaced icon for Service Provider Management
  CreditCardOutlined, // Replaced icon for Payment Transactions
} from '@mui/icons-material'; // Import icons from Material-UI
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';
import CategoriesManagementPage from './Categories-management';
import ServiceProviderPage from './Service-provider-management';
import PaymentTransactionPage from './Payment-transactions';
import Avatar from '@mui/material/Avatar';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('categories-management');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'categories-management':
        return <CategoriesManagementPage />;
      case 'service-provider-management':
        return <ServiceProviderPage />;
      case 'payment-transactions':
        return <PaymentTransactionPage/>;
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
              <Button onClick={() => handlePageChange('categories-management')} className={`nav-link ${selectedPage === 'categories-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
  <AccountBalanceOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
  <span className='nav-link-name' style={{ color: 'white' }}>Categories </span>
</Button>
<Button onClick={() => handlePageChange('service-provider-management')} className={`nav-link ${selectedPage === 'service-provider-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
  <BusinessOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
  <span className='nav-link-name' style={{ color: 'white' }}> Providers </span>
</Button>
<Button onClick={() => handlePageChange('payment-transactions')} className={`nav-link ${selectedPage === 'payment-transactions' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
  <CreditCardOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
  <span className='nav-link-name' style={{ color: 'white' }}>Payments</span>
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
