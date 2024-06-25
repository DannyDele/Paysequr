import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Container } from '@mui/material';
import { HourglassEmpty, HelpOutline, CheckCircle } from '@mui/icons-material'; // Import icons for different verification statuses
import PendingVerifications from './Pending-verifications'; // Import component for pending verifications
import QueriedVerifications from './Queried-verifications'; // Import component for queried verifications
import CompletedVerifications from './Completed-verifications'; // Import component for completed verifications
import useStyles from '../../assets/muiStyles/styles'; // Adjust the path based on your actual file structure


const UserVerificationPage = () => {
  const classes = useStyles()
  const [showPendingVerifications, setShowPendingVerifications] = useState(true); // Set initial state to true
  const [showQueriedVerifications, setShowQueriedVerifications] = useState(false);
  const [showCompletedVerifications, setShowCompletedVerifications] = useState(false);

  // Handle click for showing pending verifications
  const handleViewPendingVerifications = () => {
    setShowPendingVerifications(true);
    setShowQueriedVerifications(false);
    setShowCompletedVerifications(false);
  };

  // Handle click for showing queried verifications
  const handleViewQueriedVerifications = () => {
    setShowPendingVerifications(false);
    setShowQueriedVerifications(true);
    setShowCompletedVerifications(false);
  };

  // Handle click for showing completed verifications
  const handleViewCompletedVerifications = () => {
    setShowPendingVerifications(false);
    setShowQueriedVerifications(false);
    setShowCompletedVerifications(true);
  };

  return (
    <Container>
      <div style={{ marginTop: '20px' }}>
        {/* Button for pending verifications */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<HourglassEmpty />}
          style={{ marginRight: '20px', height: '40px', backgroundColor: showPendingVerifications ? '#eff1f5' : '#eff1f5' }} // Change background color based on state
          onClick={handleViewPendingVerifications}
        >
          Pending Verifications
        </Button>

        {/* Button for queried verifications */}
        <Button
          variant="outlined"
          color="warning"
          startIcon={<HelpOutline />}
          style={{ marginRight: '20px', height: '40px', backgroundColor: showQueriedVerifications ? '#eff1f5' : '#eff1f5' }} // Change background color based on state
          onClick={handleViewQueriedVerifications}
        >
          Queried Verifications
        </Button>

        {/* Button for completed verifications */}
        <Button
          variant="outlined"
          color="success"
          startIcon={<CheckCircle />}
          style={{ height: '40px', backgroundColor: showCompletedVerifications ? '#eff1f5' : '#eff1f5' }} // Change background color based on state
          onClick={handleViewCompletedVerifications}
        >
          Completed Verifications
        </Button>

        <div className='mt-5'>
           <Typography variant="h4" className={classes.globalTypography}  gutterBottom>
        User Verification
      </Typography>
        </div>
      </div>

      {/* Render different verification components based on state */}
      {showPendingVerifications && <PendingVerifications />}
      {showQueriedVerifications && <QueriedVerifications />}
      {showCompletedVerifications && <CompletedVerifications />}
    </Container>
  );
};

export default UserVerificationPage;
