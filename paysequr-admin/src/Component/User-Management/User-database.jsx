import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Container, TextField, Grid, Paper, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import { fetchUsers } from './../../redux/userSlice';

const UserDatabase = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
    // Filter users based on search query
  };

  // Columns definition for the DataGrid
  const columns = [
     { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'firstname', headerName: 'First Name', width: 150 },
  { field: 'middlename', headerName: 'Middle Name', width: 150 },
  { field: 'lastname', headerName: 'Last Name', width: 150 },
  { field: 'tier', headerName: 'KYC Level', width: 150 },
  { field: 'vstatus', headerName: 'Status', width: 150 },
    // Rest of the columns...
  ];

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Box mt={4}>
        <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            User Database
          </Typography>
          <TextField
            label="Search users"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
          />
        </Paper>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              checkboxSelection
              disableSelectionOnClick
              onRowClick={(params) => handleViewUser(params.row)}
            />
          </div>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {/* Dialog content */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDatabase;







//   <DialogContent>
//   <div style={{ textAlign: 'left' }}>
//     <div style={{ marginBottom: '20px' }}>
//     <Avatar
//   alt="Profile"
//   src={selectedUser ? selectedUser.profilePhoto : ''}
//   style={{
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     display: 'block',
//     width: '100px',
//     height: '100px',
//   }}
// />
//     </div>
//     <div style={{ width:'300px',marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
//       <Typography variant="body1" gutterBottom>
//         <strong>Verified Status:</strong> {selectedUser ? selectedUser.verifiedStatus : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>KYC Tier Level:</strong> {selectedUser ? selectedUser.kycTierLevel : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>User ID:</strong> {selectedUser ? selectedUser.userId : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Username:</strong> {selectedUser ? selectedUser.username : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Name:</strong> {selectedUser ? `${selectedUser.firstName} ${selectedUser.middleName} ${selectedUser.lastName}` : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Email:</strong> {selectedUser ? selectedUser.email : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Phone Number:</strong> {selectedUser ? selectedUser.phoneNumber : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Role:</strong> {selectedUser ? selectedUser.role : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Date Verified:</strong> {selectedUser ? selectedUser.dateVerified : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Date Joined:</strong> {selectedUser ? selectedUser.dateJoined : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Account no 1:</strong> {selectedUser ? selectedUser.accountNo1 : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Account no 2:</strong> {selectedUser ? selectedUser.accountNo2 : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>BVN:</strong> {selectedUser ? selectedUser.bvn : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Address:</strong> {selectedUser ? selectedUser.address : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Identity Card Number:</strong> {selectedUser ? selectedUser.identityCardNo : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Identity Card Preview:</strong> {selectedUser ? selectedUser.identityCardPreview : ''}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Activity Log:</strong> {selectedUser ? selectedUser.activityLog : ''}
//       </Typography>
//     </div>
//   </div>
// </DialogContent>