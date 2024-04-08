import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { PersonAddDisabled, Chat } from '@mui/icons-material'; // Import icons for User Banning and Communication with Users
import UserBanning from './User-banning'; // Import UserBanning component
import CommunicationWithUsers from './Communication'; // Import CommunicationWithUsers component

const UserActionPage = () => {
  const [showUserBanning, setShowUserBanning] = useState(true); // Set initial state to true
  const [showCommunicationWithUsers, setShowCommunicationWithUsers] = useState(false);

  // Define the users array
  const users = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
    // Add more user data as needed
  ];

  const handleViewUserBanning = () => {
    setShowUserBanning(true);
    setShowCommunicationWithUsers(false);
  };

  const handleViewCommunicationWithUsers = () => {
    setShowUserBanning(false);
    setShowCommunicationWithUsers(true);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ marginTop: '20px', marginLeft: '50px' }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<PersonAddDisabled />}
          style={{ marginRight: '20px', height: '70px', backgroundColor: showUserBanning ? '#eff1f5' : '#eff1f5 ' }} // Change background color based on state
          onClick={handleViewUserBanning}
        >
          User Banning
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Chat />}
          style={{ height: '70px', backgroundColor: showCommunicationWithUsers ? '#eff1f5' : '#eff1f5' }} // Change background color based on state
          onClick={handleViewCommunicationWithUsers}
        >
          Communication with Users
        </Button>
      </div>
      {showUserBanning && <UserBanning users={users} />}
      {showCommunicationWithUsers && <CommunicationWithUsers users={users} />}
    </div>
  );
};

export default UserActionPage;
