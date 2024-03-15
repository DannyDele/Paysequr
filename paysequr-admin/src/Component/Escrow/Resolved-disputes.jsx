import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component

const ResolvedDisputePage = () => {
  // Sample data for the resolved disputes table
  const resolvedDisputes = [
    { id: 1, date: '2024-03-08', escrowId: 1, buyerUsername: 'JohnDoe', merchantUsername: 'JaneSmith', complainant: 'Customer' },
    { id: 2, date: '2024-03-07', escrowId: 2, buyerUsername: 'Alice', merchantUsername: 'Bob', complainant: 'Merchant' },
    // Add more resolved dispute data as needed
  ];

  const columns = [
    { field: 'date', headerName: 'Date of Transaction', flex: 1 },
    { field: 'escrowId', headerName: 'Escrow ID', flex: 1 },
    { field: 'buyerUsername', headerName: 'Buyer Username', flex: 1 },
    { field: 'merchantUsername', headerName: 'Merchant Username', flex: 1 },
    { field: 'complainant', headerName: 'Complainant', flex: 1 },
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginTop: '20px' }}>
        Resolved Disputes
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={resolvedDisputes} columns={columns} pageSize={5} />
      </div>
    </Container>
  );
};

export default ResolvedDisputePage;
