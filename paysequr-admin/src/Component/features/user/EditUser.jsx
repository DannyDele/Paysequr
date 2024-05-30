import React from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function EditUser({user, onClose}) {
  return (
      <Paper elevation={3} style={{ padding: 40, maxWidth: 1000, margin: 'auto' }}>
          <div className='flex items-center mb-7'>
                <ArrowBackIcon sx={{ marginRight: '1rem' }} onClick={onClose} /> 
              <Typography  variant='h6'>Edit User</Typography>
              </div>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom={4}>
          <TextField label="First Name" value={user.firstname} variant="outlined" style={{ flex: 1, marginRight: 10 }} />
          <TextField label="Last Name" value={user.lastname} variant="outlined" style={{ flex: 1 }} />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom={4}>
          <TextField label="Email" value={user.email} variant="outlined" style={{ flex: 1, marginRight: 10 }} />
          <TextField label="Phone Number" value={user.phone_no} variant="outlined" style={{ flex: 1 }} />
        </Box>
        <TextField label="Address" value={user.address} variant="outlined" style={{ marginBottom: 30 }} />
        <Button variant="contained" color="primary" style={{ width: '100%', textTransform:'capitalize' }}>
          Update
        </Button>
      </Box>
    </Paper>
  );
}

export default EditUser;
