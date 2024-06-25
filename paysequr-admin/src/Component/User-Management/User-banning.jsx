import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, MenuItem, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { updateUserStatus } from './../../redux/userStatusSlice'; // Import your updateUserStatus action from userStatusSlice.js
import { Snackbar, SnackbarContent, IconButton, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useStyles from '../../assets/muiStyles/styles'; // Adjust the path based on your actual file structure
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';








const UserBanning = ({ users }) => {
  const dispatch = useDispatch();
    const classes = useStyles();

  const [selectedUserId, setSelectedUserId] = useState(''); // State to store selected user's ID
  const [action, setAction] = useState('');
  const [actionDuration, setActionDuration] = useState('');
  const [actionDurationCustom, setActionDurationCustom] = useState('');

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
    const [message, setMessage] = useState('');



 // Handle form submission
const handleSubmit = async () => {
  try {
    // Dispatch updateUserStatus action with selectedUserId and action
    dispatch(updateUserStatus({ userId: selectedUserId, status: action }));
    console.log('User status updated successfully.');
      // Determine the appropriate message based on the action
    let message = '';
    if (action === 'disable') {
      message = 'User with ID ' + selectedUserId + ' is banned.';
    } else if (action === 'active') {
      message = 'User with ID ' + selectedUserId + ' is activated.';
    } else {
      message = 'User status updated successfully.';
    }
    // Show Snackbar with the determined message
    setSnackbarSeverity('success');
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    // Reset form fields if needed
    setSelectedUserId('');
    setAction('');
    setActionDuration('');
    setActionDurationCustom('');
    setMessage('');
  } catch (error) {
    console.error('Error updating user status:', error);
    // Handle error if necessary
  }
  };


  
// Function to handle snackbar
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};

  


  return (
    <Box>
    <Paper elevation={3} style={{ marginLeft: '50px', marginTop: '20px', padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" className={classes.globalTypography} gutterBottom>
        User Suspension/Banning
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
       value={users.find(user => user.id === selectedUserId) || null}
         onChange={(event, newValue) => {
  if (newValue && newValue.id) {
    setSelectedUserId(newValue.id);
    console.log('Selected user ID:', newValue.id);
  }
}}
            options={users}
              getOptionLabel={(user) => user.username} // Customize to display username
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
            <MenuItem value="disable">Ban</MenuItem>
            <MenuItem value="active">Unban</MenuItem>
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

      
{/* Snackbar component */}

<Snackbar
  anchorOrigin={{
    vertical: 'top', // Change to 'top'
    horizontal: 'right', // Change to 'right'
  }}
  open={snackbarOpen}
  autoHideDuration={6000}
        onClose={handleSnackbarClose}
                TransitionComponent={Slide} // Use Slide transition

>
  <SnackbarContent
    className={snackbarSeverity === 'success' ? classes.success : classes.error}
    message={
      <span className={classes.message}>
        <CheckCircleIcon className={classes.icon} />
        {snackbarMessage}
      </span>
    }
    action={[
      <IconButton key="close" color="inherit" onClick={handleSnackbarClose}>
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
  />
</Snackbar>
    
    </Box>
    
  );
};

export default UserBanning;
