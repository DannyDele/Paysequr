import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AppSettingsPage = () => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('UTC');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEscrowEnabled, setIsEscrowEnabled] = useState(true);
  const [isBillPaymentEnabled, setIsBillPaymentEnabled] = useState(true);
  const [isEcommerceEnabled, setIsEcommerceEnabled] = useState(true);
  // const [showSettings, setShowSettings] = useState(false);

  // const handleEditSettings = () => {
  //   setShowSettings(false);
  // };

  const ListItem = ({ label, value }) => (
    <Typography variant="body1" gutterBottom>
      <strong>{label}:</strong> {value}
    </Typography>
  );

  const InputList = ({ items }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map(item => (
        <ListItem key={item.label} label={item.label} value={item.value} />
      ))}
    </Box>
  );

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>General Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <Typography variant="subtitle1">Language</Typography>
                    <RadioGroup value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <FormControlLabel value="en" control={<Radio />} label="English" />
                      <FormControlLabel value="fr" control={<Radio />} label="French" />
                      <FormControlLabel value="es" control={<Radio />} label="Spanish" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <Typography variant="subtitle1">Currency</Typography>
                    <RadioGroup value={currency} onChange={(e) => setCurrency(e.target.value)}>
                      <FormControlLabel value="USD" control={<Radio />} label="US Dollar" />
                      <FormControlLabel value="EUR" control={<Radio />} label="Euro" />
                      <FormControlLabel value="GBP" control={<Radio />} label="British Pound" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <Typography variant="subtitle1">Time Zone</Typography>
                    <RadioGroup value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
                      <FormControlLabel value="UTC" control={<Radio />} label="UTC" />
                      <FormControlLabel value="EST" control={<Radio />} label="Eastern Standard Time" />
                      <FormControlLabel value="PST" control={<Radio />} label="Pacific Standard Time" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />}
                      label="Dark Mode"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Module Configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={isEscrowEnabled} onChange={() => setIsEscrowEnabled(!isEscrowEnabled)} />}
                      label="Enable Escrow Module"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={isBillPaymentEnabled} onChange={() => setIsBillPaymentEnabled(!isBillPaymentEnabled)} />}
                      label="Enable Bill Payment Module"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={isEcommerceEnabled} onChange={() => setIsEcommerceEnabled(!isEcommerceEnabled)} />}
                      label="Enable Ecommerce Module"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default AppSettingsPage;
