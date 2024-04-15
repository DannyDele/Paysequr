import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NotificationPreferencesPage = () => {
  // State for admin alerts
  const [adminAlerts, setAdminAlerts] = useState(false);

  // State for user notifications
  const [userNotifications, setUserNotifications] = useState(false);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Notification Preferences
      </Typography>
      
      <Box mb={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Admin Alerts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={adminAlerts} onChange={() => setAdminAlerts(!adminAlerts)} />}
                label="Receive notifications for important events and updates"
              />
              <FormControlLabel
                control={<Switch />}
                label="Set preferences for receiving notifications and alerts"
                disabled={!adminAlerts}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mb={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>User Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={userNotifications} onChange={() => setUserNotifications(!userNotifications)} />}
                label="Customize communication preferences for users"
              />
              <FormControlLabel
                control={<Switch />}
                label="Manage the types of notifications users receive (transactions, updates, etc.)"
                disabled={!userNotifications}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default NotificationPreferencesPage;
