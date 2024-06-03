import React, { useState } from 'react';
import '../../index.css';
import { Button } from '@mui/material';
import {
  DashboardOutlined,
  Menu,
  Close,
  PeopleAltOutlined, // Replaced icon for User Database
  AssignmentOutlined, // Replaced icon for User Actions
  HowToRegOutlined, // Replaced icon for User Verifications
  VerifiedUserOutlined, // Replaced icon for KYC Verification
} from '@mui/icons-material'; // Import icons from Material-UI
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Typography } from '@mui/material';
import PaysequrIcon from '../Dashboard/images/Paysequricon.png';
import { Link } from 'react-router-dom';
import UserDatabase from './User-database';
import UserActionPage from './User-actions';
import UserVerificationPage from './User-verification';
import KYCVerificationPage from './KYC-verification';
import UserProfileChangeRequest from './User-profile-change-request'
import Avatar from '@mui/material/Avatar';

const Sidebar = ({ onPageChange }) => {
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useState('user-database');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'user-verification':
        return <UserVerificationPage />;
      case 'user-actions':
        return <UserActionPage />;
      case 'user-database':
        return <UserDatabase/>;
      case 'kyc-verification':
        return <KYCVerificationPage />;
      case 'user-profile-change-request':
        return <UserProfileChangeRequest/>
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
              <Button onClick={() => handlePageChange('user-database')} className={`nav-link ${selectedPage === 'categories-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <PeopleAltOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
                <span className='nav-link-name' style={{ color: 'white' }}>User Database</span>
              </Button>
              <Button onClick={() => handlePageChange('user-actions')} className={`nav-link ${selectedPage === 'categories-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <AssignmentOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' /> 
                <span className='nav-link-name' style={{ color: 'white' }}>User Actions</span>
              </Button>
              <Button onClick={() => handlePageChange('user-verification')} className={`nav-link ${selectedPage === 'service-provider-management' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <HowToRegOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>User Verification</span>
              </Button>
              <Button onClick={() => handlePageChange('kyc-verification')} className={`nav-link ${selectedPage === 'payment-transactions' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <VerifiedUserOutlined style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>KYC Verification</span>
              </Button>
              <Button onClick={() => handlePageChange('user-profile-change-request')} className={`nav-link ${selectedPage === 'payment-transactions' ? 'active' : ''}`} style={{ marginBottom: '10px' }}>
                <ManageAccountsOutlinedIcon style={{ color: '#F36C00', fontSize: '28px' }} className='nav-link-icon' />
                <span className='nav-link-name' style={{ color: 'white' }}>Profile Change Request</span>
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
