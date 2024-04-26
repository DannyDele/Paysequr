import React, { useState } from 'react';
import { Container, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField , InputAdornment} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

const UserActivityLogPage = () => {
  // Dummy data for user activity log including IPN
  const [userActivityLog, setUserActivityLog] = useState([
    { id: 1, user: 'John Doe', activity: 'Login', timestamp: '2024-03-08 10:15:30', suspicious: false, ipn: '192.168.1.1' },
    { id: 2, user: 'Jane Smith', activity: 'Transaction', timestamp: '2024-03-08 11:30:45', suspicious: false, ipn: '192.168.1.2' },
    { id: 3, user: 'John Doe', activity: 'Profile Update', timestamp: '2024-03-08 12:45:20', suspicious: false, ipn: '192.168.1.3' },
    { id: 4, user: 'Alice Johnson', activity: 'Login', timestamp: '2024-03-08 13:20:10', suspicious: false, ipn: '192.168.1.4' },
    { id: 5, user: 'Bob Williams', activity: 'Transaction', timestamp: '2024-03-08 14:55:05', suspicious: false, ipn: '192.168.1.5' },
    { id: 6, user: 'John Doe', activity: 'Unauthorized Access Attempt', timestamp: '2024-03-08 15:30:10', suspicious: true, ipn: '192.168.1.6' },
  ]);

  // State to manage dialog and search value
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Handle Investigate action
  const handleInvestigate = (activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter user activity log based on search value
  const filteredActivityLog = userActivityLog.filter(activity =>
    activity.user.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Columns configuration for DataGrid including IPN
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'activity', headerName: 'Activity', width: 200 },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'ipn', headerName: 'IPN', width: 150 },
    {
      field: 'suspicious',
      headerName: 'Suspicious',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: params.value ? red[500] : 'inherit', marginRight: '4px' }}>
            {params.value ? 'Yes' : 'No'}
          </span>
          {params.value && (
            <IconButton onClick={() => handleInvestigate(params.row)}>
              <SearchIcon />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }} gutterBottom>
        User Activity Log
      </Typography>
      <TextField
          label="Search by username"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          style={{   width: '100%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      <Paper elevation={3} style={{ marginTop: '20px', width: '100%' }}>
        
        <DataGrid
          rows={filteredActivityLog}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>

      {/* Dialog for displaying suspicious activity details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Suspicious Activity Details</DialogTitle>
        <DialogContent>
          {selectedActivity && (
            <div>
              <Typography>User: {selectedActivity.user}</Typography>
              <Typography>Activity: {selectedActivity.activity}</Typography>
              <Typography>Timestamp: {selectedActivity.timestamp}</Typography>
              <Typography>IPN: {selectedActivity.ipn}</Typography>
              {/* Add more details as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserActivityLogPage;
