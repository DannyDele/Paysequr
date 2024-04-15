import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
  TextField,
  ListItem,
  ListItemText,
  List,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SecuritySettingsPage = () => {
  // State for password policy settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Function to handle saving 2FA settings
  const handleSaveTwoFactorAuthSettings = () => {
    // Logic to save 2FA settings
    console.log('Two-factor authentication settings saved');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Security Settings
      </Typography>
      <Box mb={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Two-Factor Authentication</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                <Button variant="contained" onClick={handleSaveTwoFactorAuthSettings}>
                  Save Two-Factor Authentication Settings
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Privacy Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Visibility settings for profile or account"
                    secondary="Control who can see your profile or account information."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Data sharing preferences"
                    secondary="Manage how your data is shared with others."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Permission management for third-party apps"
                    secondary="Review and control the permissions granted to third-party apps."
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Device Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemText primary="List of devices logged into the account" secondary="Coming soon..." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Ability to log out from devices" secondary="Coming soon..." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Device authorization settings" secondary="Coming soon..." />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Security Features</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemText primary="Biometric authentication options (fingerprint, face ID)" secondary="Coming soon..." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Security key management" secondary="Coming soon..." />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Activity Monitoring</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemText primary="Recent login history" secondary="View the history of recent logins to your account." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Notifications for suspicious activity" secondary="Receive notifications for any suspicious activity detected on your account." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Option to revoke access for connected devices or applications" secondary="Easily revoke access for any devices or applications connected to your account." />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Data and Privacy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                <ListItem button component="a" href="/privacy-policy">
                  <ListItemText primary="Privacy policy" />
                </ListItem>
                <ListItem button component="a" href="/terms-of-service">
                  <ListItemText primary="Terms of service" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* Add other sections for Privacy Settings, Device Management, Security Features, Activity Monitoring, Data and Privacy, Security Tips and Resources, and Help and Support */}
    </Container>
  );
};

export default SecuritySettingsPage;
