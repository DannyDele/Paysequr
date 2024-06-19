import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { PersonAddDisabled, Chat } from '@mui/icons-material'; // Import icons for User Banning and Communication with Users
import UserBanning from './User-banning'; // Import UserBanning component
import CommunicationWithUsers from './Communication'; // Import CommunicationWithUsers component
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './../../redux/userSlice'

const UserActionPage = () => {
  const [showUserBanning, setShowUserBanning] = useState(true); // Set initial state to true
  const [showCommunicationWithUsers, setShowCommunicationWithUsers] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


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
          style={{ marginRight: '20px', height: '40px', backgroundColor: showUserBanning ? '#eff1f5' : '#eff1f5 ' }} // Change background color based on state
          onClick={handleViewUserBanning}
        >
          User Banning
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Chat />}
          style={{ height: '40px', backgroundColor: showCommunicationWithUsers ? '#eff1f5' : '#eff1f5' }} // Change background color based on state
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
