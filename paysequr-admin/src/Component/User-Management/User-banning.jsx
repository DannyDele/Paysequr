import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const UserBanning = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [action, setAction] = useState('');
  const [actionDuration, setActionDuration] = useState('');
  const [actionDurationCustom, setActionDurationCustom] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    // Implement submission logic here
    console.log('Form submitted!');
    console.log('Selected user:', selectedUser);
    console.log('Action:', action);
    console.log('Action duration:', actionDuration);
    console.log('Custom action duration:', actionDurationCustom);
    console.log('Message:', message);
  };

  return (
    <Paper elevation={3} style={{ marginLeft: '50px', marginTop: '20px', padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        User Suspension/Banning
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            options={users.map((user) => user.username)}
            renderInput={(params) => <TextField {...params} label="Select user" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Select action"
            variant="outlined"
            fullWidth
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <MenuItem value="Ban">Ban</MenuItem>
            <MenuItem value="Unban">Unban</MenuItem>
            <MenuItem value="Suspension">Suspension</MenuItem>
            <MenuItem value="Unsuspend">Unsuspend</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Action duration"
            variant="outlined"
            fullWidth
            value={actionDuration}
            onChange={(e) => setActionDuration(e.target.value)}
          >
            <MenuItem value="Lifetime">Lifetime</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </TextField>
        </Grid>
        {actionDuration === 'Custom' && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Custom duration (days)"
              type="number"
              variant="outlined"
              fullWidth
              value={actionDurationCustom}
              onChange={(e) => setActionDurationCustom(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Message"
            multiline
            rows={4}
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

export default UserBanning;
