import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const CommunicationWithUsers = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null); // Change initial state to null
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    // Implement submission logic here
    console.log('Form submitted!');
    console.log('Selected user:', selectedUser);
    console.log('Message:', message);
  };

  return (
    <Paper elevation={3} style={{ marginLeft: '50px', marginTop: '20px', padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Communication with Users
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.username}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search user"
                variant="outlined"
              />
            )}
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Message"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommunicationWithUsers;
