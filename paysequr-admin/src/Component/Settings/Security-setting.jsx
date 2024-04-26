import React, { useState } from 'react';
import {
  Container,
  Typography,
  Avatar,
  Box,
  Grid,
  Button,
  TextField,
  Divider,
  ListItem,
  ListItemText,
  List,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion'; // Import animation library

const SecuritySettingsPage = () => {
  
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Desktop', loginTime: new Date() },
    { id: 2, device: 'Mobile', loginTime: new Date() },
  ]);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    minLength: 8,
    requireUpperCase: true,
    requireLowerCase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    expirationDays: 90,
  });

  const handleRevokeSession = (sessionId) => {
    setActiveSessions(activeSessions.filter((session) => session.id !== sessionId));
    setShowConfirmationDialog(false);
  };

  const handleOpenConfirmationDialog = (sessionId) => {
    setSessionToDelete(sessionId);
    setShowConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setSessionToDelete(null);
    setShowConfirmationDialog(false);
  };

  const handleSaveTwoFactorAuthSettings = () => {
    console.log('Two-factor authentication settings saved');
  };

  const handlePasswordRulesChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'expirationDays') {
      setPasswordRules((prevRules) => ({ ...prevRules, [name]: parseInt(value) }));
    } else {
      setPasswordRules((prevRules) => ({ ...prevRules, [name]: checked }));
    }
  };

 
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Security Settings
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={2}
      >
        {/* Privacy & personalization box */}
        <Box
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          flexGrow={1}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxWidth: '750px',
            width: '100%',
          }}
        >
          <Avatar alt="Privacy & personalization" src="/path/to/privacy-icon.png" sx={{ width: 60, height: 60, marginBottom: 1 }} />
          <Typography variant="h6" gutterBottom>
            Privacy & personalization
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            See the data in your Account and choose what activity is saved to personalize your  experience
          </Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}  href="#data-privacy-section">
            Manage your data & privacy
          </Button>
        </Box>

        {/* Your account is protected box */}
        <Box
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          flexGrow={1}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxWidth: '750px',
            width: '100%',
          }}
        >
          <Avatar alt="Your account is protected" src="/path/to/security-icon.png" sx={{ width: 60, height: 60, marginBottom: 1 }} />
          <Typography variant="h6" gutterBottom>
            Your account is protected
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            The Security Checkup checked your account and found no recommended actions
          </Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            See details
          </Button>
        </Box>
      </Box>

      <Box mb={2}>
        <Paper elevation={3} style={{ marginBottom: '16px' }}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Two-Factor Authentication
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />}
                      label="Enable Two-Factor Authentication"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {twoFactorAuth && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Configure Two-Factor Authentication Options:
                    </Typography>
                    <TextField label="Phone Number" variant="outlined" fullWidth />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={handleSaveTwoFactorAuthSettings}>
                  Save Two-Factor Authentication Settings
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      <Paper elevation={3} style={{ marginBottom: '16px' }}>
      <Box mt={6}  id="data-privacy-section">
        <Typography variant="h5" gutterBottom>
          Privacy Settings
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Visibility settings for profile or account"
              secondary="Control who can see your profile or account information."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Data sharing preferences"
              secondary="Manage how your data is shared with others."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Permission management for third-party apps"
              secondary="Review and control the permissions granted to third-party apps."
            />
          </ListItem>
        </List>
      </Box>

      
      </Paper>

      {/* Password Complexity and Expiration Policies */}
      <Paper elevation={3} style={{ marginBottom: '16px' }}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Password Complexity and Expiration Policies
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={passwordRules.requireUpperCase} onChange={handlePasswordRulesChange} name="requireUpperCase" />}
                label="Require uppercase letters"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={passwordRules.requireLowerCase} onChange={handlePasswordRulesChange} name="requireLowerCase" />}
                label="Require lowercase letters"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={passwordRules.requireNumbers} onChange={handlePasswordRulesChange} name="requireNumbers" />}
                label="Require numbers"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={passwordRules.requireSpecialChars} onChange={handlePasswordRulesChange} name="requireSpecialChars" />}
                label="Require special characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Minimum Length"
                variant="outlined"
                type="number"
                value={passwordRules.minLength}
                onChange={handlePasswordRulesChange}
                name="minLength"
              
                style={{width:'45%', marginRight:'35px'}}
              />
               <TextField
                label="Expiration Days"
                variant="outlined"
                type="number"
                value={passwordRules.expirationDays}
                onChange={handlePasswordRulesChange}
                name="expirationDays"
               
                style={{width:'45%'}}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Session Management */}
      <Paper elevation={3} style={{ marginBottom: '16px' }}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Session Management
          </Typography>
          <List>
            {activeSessions.map((session) => (
              <ListItem key={session.id}>
                <ListItemText primary={`Device: ${session.device}`} secondary={`Login Time: ${session.loginTime}`} />
                <IconButton onClick={() => handleOpenConfirmationDialog(session.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmationDialog} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Are you sure you want to revoke this session?</DialogTitle>
        <DialogContent>
          This action will log you out from the device.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleRevokeSession(sessionToDelete)} color="primary" autoFocus>
            Revoke
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SecuritySettingsPage;
