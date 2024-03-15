import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';
import ResolvedDisputes from './Resolved-disputes'; // Import ResolvedDisputes component
import UnresolvedDisputes from './Unresolved-disputes'; // Import UnresolvedDisputes component

const DisputeResolutionPage = () => {
  const [showResolvedDisputes, setShowResolvedDisputes] = useState(true); // Set initial state to true
  const [showUnresolvedDisputes, setShowUnresolvedDisputes] = useState(false);

  const handleViewResolvedDisputes = () => {
    setShowResolvedDisputes(true);
    setShowUnresolvedDisputes(false);
  };

  const handleViewUnresolvedDisputes = () => {
    setShowResolvedDisputes(false);
    setShowUnresolvedDisputes(true);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ marginTop: '20px', marginLeft: '50px' }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<CheckCircleOutline />}
          style={{ marginRight: '20px', height: '70px', backgroundColor: showResolvedDisputes ? '#eff1f5' : '#eff1f5 ' }} // Change background color based on state
          onClick={handleViewResolvedDisputes}
        >
          Resolved Disputes
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelOutlined />}
          style={{ height: '70px', backgroundColor: showUnresolvedDisputes ? '#eff1f5' : '#eff1f5' }} // Change background color based on state
          onClick={handleViewUnresolvedDisputes}
        >
          Unresolved Disputes
        </Button>
      </div>
      {showResolvedDisputes && <ResolvedDisputes />} {/* Render ResolvedDisputes if showResolvedDisputes is true */}
      {showUnresolvedDisputes && <UnresolvedDisputes />} {/* Render UnresolvedDisputes if showUnresolvedDisputes is true */}
    </div>
  );
};

export default DisputeResolutionPage;
