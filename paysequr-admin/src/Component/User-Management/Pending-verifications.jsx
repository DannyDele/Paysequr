import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PendingVerificationsPage = () => {
  // Dummy data for pending verifications
  const pendingVerifications = [
    {
      id: 1,
      username: 'john_doe',
      firstName: 'John',
      middleName: 'Adam',
      lastName: 'Doe',
      kycLevel: 'Level 1',
      statusFromVFD: 'Pending',
      verificationDocument: 'passport.jpg',
    },
    // Add more pending verifications as needed
  ];

  // Columns definition for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'middleName', headerName: 'Middle Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'kycLevel', headerName: 'KYC Level', width: 130 },
    { field: 'statusFromVFD', headerName: 'Status from VFD Bank', width: 200 },
    { field: 'verificationDocument', headerName: 'Verification Document', width: 200 },
  ];

  return (
    <div style={{  marginLeft:'50px',marginTop:'20px',height: 400, width: '95%' }}>
      <DataGrid rows={pendingVerifications} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default PendingVerificationsPage;
