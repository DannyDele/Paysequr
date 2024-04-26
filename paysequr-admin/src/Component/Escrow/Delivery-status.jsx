import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'trackingNumber', headerName: 'Tracking Number', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'expectedDelivery', headerName: 'Expected Delivery', width: 200 },
];

const TrackDeliveryStatusPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState([
    { id: 1, trackingNumber: '123456789', status: 'In Transit', location: 'Sorting Facility', expectedDelivery: 'April 20, 2024' },
    { id: 2, trackingNumber: '987654321', status: 'Out for Delivery', location: 'Nearby Area', expectedDelivery: 'April 19, 2024' },
    { id: 3, trackingNumber: '567890123', status: 'Delivered', location: 'Customer Address', expectedDelivery: 'April 18, 2024' },
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSearch = () => {
    // Filter trackingInfo based on searchKeyword
    const filteredData = trackingInfo.filter((item) =>
      item.trackingNumber.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setTrackingInfo(filteredData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box mb={2} display="flex" justifyContent="center">
        <TextField
          label="Search Tracking number"
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
          loading={loading}
          disableColumnMenu
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default TrackDeliveryStatusPage;
