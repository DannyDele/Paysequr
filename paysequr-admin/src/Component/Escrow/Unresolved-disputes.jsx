import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material'; // Added Box for layout
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const UnresolvedDisputePage = () => {
  const navigate = useNavigate();

  const resolvedDisputes = [
    { id: 1, date: '2024-03-08', escrowId: 1, buyerUsername: 'JohnDoe', merchantUsername: 'JaneSmith', complainant: 'Customer' },
    { id: 2, date: '2024-03-07', escrowId: 2, buyerUsername: 'Alice', merchantUsername: 'Bob', complainant: 'Merchant' },
    // Add more sample data as needed
  ];

  const columns = [
    { field: 'date', headerName: 'Date of Transaction', flex: 1 },
    { field: 'escrowId', headerName: 'Escrow ID', flex: 1 },
    { field: 'buyerUsername', headerName: 'Buyer Username', flex: 1 },
    { field: 'merchantUsername', headerName: 'Merchant Username', flex: 1 },
    { field: 'complainant', headerName: 'Complainant', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" style={{ width: '200px' }}> {/* Adjusted width */}
          <Button variant="outlined" color="primary" style={{ minWidth: '70px', padding: '5px' }} onClick={() => handleViewDispute(params.row)}>
            View Dispute
          </Button>
          <Button variant="outlined" color="secondary" style={{ minWidth: '70px', padding: '5px' }} onClick={() => handleResolveDispute(params.row)}>
            Resolve
          </Button>
        </Box>
      ),
    },
  ];

  const handleViewDispute = (dispute) => {
    navigate('/chat', { state: { disputeDetails: dispute } });
  };

  const handleResolveDispute = (dispute) => {
    // Handle resolution logic here
    console.log('Resolve dispute:', dispute);
  };

  return (
    <Container style={{ width: '100%', paddingTop: '20px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginBottom: '20px' }}>
        Unresolved Disputes
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={resolvedDisputes} columns={columns} pageSize={5} />
      </div>
    </Container>
  );
};

export default UnresolvedDisputePage;
