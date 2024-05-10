import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'trackingNumber', headerName: 'Tracking Number', width: 150 },
  { field: 'receiverUsername', headerName: 'Receiver Username', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'location', headerName: 'Location', width: 180 },
  { field: 'expectedDelivery', headerName: 'Expected Delivery', width: 180 },
];

const TrackDeliveryStatusPage = () => {
  const [trackingInfo, setTrackingInfo] = useState([
    { id: 1, trackingNumber: '123456789', receiverUsername: 'user1', status: 'In Transit', location: 'Sorting Facility', expectedDelivery: 'April 20, 2024',deliveryType:'Door-To-Door', senderUsername:'Sender 1' },
    { id: 2, trackingNumber: '987654321', receiverUsername: 'user2', status: 'Out for Delivery', location: 'Nearby Area', expectedDelivery: 'April 19, 2024',deliveryType:'Door-To-Door', senderUsername:'Sender 1'  },
    { id: 3, trackingNumber: '567890123', receiverUsername: 'user3', status: 'Delivered', location: 'Customer Address', expectedDelivery: 'April 18, 2024',deliveryType:'Door-To-Door', senderUsername:'Sender 1' },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(''); // Define searchKeyword state variable

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearch = () => {
    // Filter trackingInfo based on searchKeyword and sender username
    const filteredData = trackingInfo.filter((item) =>
      item.trackingNumber.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.senderUsername.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setTrackingInfo(filteredData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box mb={2} display="flex" justifyContent="center">
        <TextField
          label="Search Tracking number or Sender Username"
          variant="outlined"
          value={searchKeyword}
          style={{ width: '95%' }}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={trackingInfo}
          columns={columns}
          pageSize={5}
          onRowClick={handleRowClick}
          disableColumnMenu
          disableSelectionOnClick
        />
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Tracking Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Tracking Number"
            variant="outlined"
            value={selectedRow?.trackingNumber || ''}
            fullWidth
            disabled
            style={{ marginTop:'10px',marginBottom: '10px' }}
          />
          <TextField
            label="Sender Username"
            variant="outlined"
            value={selectedRow?.senderUsername || ''}
            fullWidth
            disabled
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Status"
            variant="outlined"
            value={selectedRow?.status || ''}
            fullWidth
            disabled
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Location"
            variant="outlined"
            value={selectedRow?.location || ''}
            fullWidth
            disabled
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Expected Delivery"
            variant="outlined"
            value={selectedRow?.expectedDelivery || ''}
            fullWidth
            disabled
            style={{ marginBottom: '10px' }}
          />
          {/* Additional fields for delivery type and receiver username */}
          <TextField
            label="Delivery Type"
            variant="outlined"
            value={selectedRow?.deliveryType || ''}
            fullWidth
            disabled
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Sender Username"
            variant="outlined"
            value={selectedRow?.senderUsername || ''}
            fullWidth
            disabled
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TrackDeliveryStatusPage;
