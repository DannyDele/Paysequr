import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Snackbar,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const NotificationPreferencesPage = () => {
  // State for admin alerts
  const [adminAlerts, setAdminAlerts] = useState(false);

  // State for user notifications
  const [userNotifications, setUserNotifications] = useState(false);

  // State for email notifications
  const [emailNotifications, setEmailNotifications] = useState(false);

  // State for notification frequency
  const [notificationFrequency, setNotificationFrequency] = useState('');

  // State for saving preferences status
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const handleSavePreferences = () => {
    // Logic to save notification preferences
    setSavingPreferences(true);
    // Simulate save process
    setTimeout(() => {
      setSavingPreferences(false);
      setSaveSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Notification Preferences
      </Typography>

      <Box mb={2}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography>Admin Alerts</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={adminAlerts} onChange={() => setAdminAlerts(!adminAlerts)} />}
                label={
                  <Tooltip title="Receive notifications for important events and updates">
                    <span>Receive notifications for important events and updates</span>
                  </Tooltip>
                }
              />
              {adminAlerts && (
                <FormControlLabel
                  control={<Switch />}
                  label="Set preferences for receiving notifications and alerts"
                />
              )}
            </FormGroup>
          </Box>
        </Paper>
      </Box>

      <Box mb={2}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography>User Notifications</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={userNotifications} onChange={() => setUserNotifications(!userNotifications)} />}
                label={
                  <Tooltip title="Customize communication preferences for users">
                    <span>Customize communication preferences for users</span>
                  </Tooltip>
                }
              />
              {userNotifications && (
                <FormControlLabel
                  control={<Switch />}
                  label="Manage the types of notifications users receive (transactions, updates, etc.)"
                />
              )}
            </FormGroup>
          </Box>
        </Paper>
      </Box>

      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="notification-frequency-label">Notification Frequency</InputLabel>
          <Select
            labelId="notification-frequency-label"
            id="notification-frequency"
            value={notificationFrequency}
            onChange={(e) => setNotificationFrequency(e.target.value)}
          >
            <MenuItem value="immediate">Immediate</MenuItem>
            <MenuItem value="daily-summary">Daily Summary</MenuItem>
            <MenuItem value="weekly-summary">Weekly Summary</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <FormControlLabel
          control={<Switch checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />}
          label="Receive notifications via email"
        />
      </Box>

      <Box>
        <Button variant="contained" color="primary" onClick={handleSavePreferences} disabled={savingPreferences}>
          {savingPreferences ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <span>Save Preferences</span>
          )}
        </Button>
      </Box>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box
          sx={{
            backgroundColor: '#43a047',
            color: 'white',
            borderRadius: '4px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CheckIcon />
          <Typography sx={{ marginLeft: '8px' }}>Preferences saved successfully!</Typography>
        </Box>
      </Snackbar>

      <Snackbar
        open={saveError}
        autoHideDuration={3000}
        onClose={() => setSaveError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            borderRadius: '4px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ErrorIcon />
          <Typography sx={{ marginLeft: '8px' }}>Failed to save preferences. Please try again.</Typography>
        </Box>
      </Snackbar>
    </Container>
  );
};

export default NotificationPreferencesPage;
