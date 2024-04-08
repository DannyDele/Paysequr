import React, { useState } from 'react';
import { Container, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

const UserActivityLogPage = () => {
  // Dummy data for user activity log
  const [userActivityLog, setUserActivityLog] = useState([
    { id: 1, user: 'John Doe', action: 'Login', timestamp: '2024-03-08 10:15:30', suspicious: false },
    { id: 2, user: 'Jane Smith', action: 'Transaction', timestamp: '2024-03-08 11:30:45', suspicious: false },
    { id: 3, user: 'John Doe', action: 'Profile Update', timestamp: '2024-03-08 12:45:20', suspicious: false },
    { id: 4, user: 'Alice Johnson', action: 'Login', timestamp: '2024-03-08 13:20:10', suspicious: false },
    { id: 5, user: 'Bob Williams', action: 'Transaction', timestamp: '2024-03-08 14:55:05', suspicious: false },
    { id: 6, user: 'John Doe', action: 'Unauthorized Access Attempt', timestamp: '2024-03-08 15:30:10', suspicious: true },
  ]);

  // State to manage dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Handle Investigate action
  const handleInvestigate = (activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Columns configuration for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
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
      <Paper elevation={3} style={{ marginTop: '20px', width: '100%' }}>
        <DataGrid
          rows={userActivityLog}
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
              <Typography>Action: {selectedActivity.action}</Typography>
              <Typography>Timestamp: {selectedActivity.timestamp}</Typography>
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
