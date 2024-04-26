
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  FormGroup,
  FormControl,
  Grid,
  Paper,
  Accordion, AccordionSummary, AccordionDetails,TextField
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
  const [commission, setCommission] = useState(0);
  const [cap, setCap] = useState(0);


  const handleCommissionChange = (event) => {
    setCommission(event.target.value);
  };


  const handleCapChange = (event) => {
    setCap(event.target.value);
  };

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    // Update local storage with the selected theme
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Update CSS variables based on the theme
    if (isDarkMode) {
      document.documentElement.style.backgroundColor = '#333';
      document.documentElement.style.color = '#fff';
    } else {
      document.documentElement.style.backgroundColor = '#fff'; // Normal background color
      document.documentElement.style.color = '#000'; // Normal text color
    }
  }, [isDarkMode]); // Run whenever isDarkMode changes

  const handleThemeChange = (theme) => {
    // Update isDarkMode state based on the selected theme
    setIsDarkMode(theme === 'dark');
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom style={{ color: isDarkMode ? '#fff' : '#000' }}>
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
            <Typography variant="h6" gutterBottom style={{ color: isDarkMode ? '#fff' : '#000' }}>
              Theme Selector
            </Typography>
            <RadioGroup
              value={isDarkMode ? 'dark' : 'light'}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={isDarkMode ? 1 : 0}
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: isDarkMode ? '#333' : '#f4f4f4' }}
                  >
                    <div
                      style={{
                        marginBottom: '10px',
                        width: '100%',
                        height: '100px',
                        backgroundColor: isDarkMode ? '#333' : '#f4f4f4',
                      }}
                    />
                    <FormControlLabel
                      value="dark"
                      control={<Radio />}
                      label="Dark Mode"
                      style={{ color: isDarkMode ? '#fff' : '#000' }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={!isDarkMode ? 1 : 0}
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: isDarkMode ? '#333' : '#f4f4f4' }}
                  >
                    <div
                      style={{
                        marginBottom: '10px',
                        width: '100%',
                        height: '100px',
                        backgroundColor: isDarkMode ? '#333' : '#f4f4f4',
                      }}
                    />
                    <FormControlLabel
                      value="light"
                      control={<Radio />}
                      label="Light Mode"
                      style={{ color: isDarkMode ? '#fff' : '#000' }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </RadioGroup>
          </Paper>
        </Grid>
        <Grid item xs={12}>
  <Paper elevation={3} style={{ padding: '20px', backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
    <Typography variant="h6" gutterBottom style={{ color: isDarkMode ? '#fff' : '#000' }}>
      General Settings
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">Language</Typography>
          <RadioGroup
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <FormControlLabel
              value="en"
              control={<Radio />}
              label="English"
            />
            <FormControlLabel
              value="fr"
              control={<Radio />}
              label="French"
            />
            <FormControlLabel
              value="es"
              control={<Radio />}
              label="Spanish"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">Currency</Typography>
          <RadioGroup
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <FormControlLabel
              value="USD"
              control={<Radio />}
              label="US Dollar"
            />
            <FormControlLabel
              value="EUR"
              control={<Radio />}
              label="Euro"
            />
            <FormControlLabel
              value="GBP"
              control={<Radio />}
              label="British Pound"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1">Time Zone</Typography>
          <RadioGroup
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <FormControlLabel
              value="UTC"
              control={<Radio />}
              label="UTC"
            />
            <FormControlLabel
              value="EST"
              control={<Radio />}
              label="Eastern Standard Time"
            />
            <FormControlLabel
              value="PST"
              control={<Radio />}
              label="Pacific Standard Time"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  </Paper>
</Grid>
<Grid item xs={12}>
<Paper elevation={3} style={{ padding: '20px', backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
      <Typography variant="h6" gutterBottom style={{ color: isDarkMode ? '#fff' : '#000' }}>
        Module Configuration
      </Typography>
      <Accordion style={{ marginBottom: '20px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="escrow-content" id="escrow-header">
          <Typography>Escrow</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isEscrowEnabled}
                  onChange={() => setIsEscrowEnabled(!isEscrowEnabled)}
                />
              }
              label="Enable Escrow Module"
            />
            {/* Commission input */}
            {isEscrowEnabled && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography>Commission:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  value={commission}
                  onChange={handleCommissionChange}
                  style={{ marginLeft: '10px', width: '100px' }}
                />
              </div>
            )}
            {/* Cap input */}
            {isEscrowEnabled && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography>Cap:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  value={cap}
                  onChange={handleCapChange}
                  style={{ marginLeft: '10px', width: '100px' }}
                />
              </div>
            )}
          </FormGroup>
        </AccordionDetails>

      </Accordion>
      <Accordion style={{ marginBottom: '20px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="ecommerce-content" id="ecommerce-header">
          <Typography>Ecommerce</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isEcommerceEnabled}
                  onChange={() => setIsEcommerceEnabled(!isEcommerceEnabled)}
                />
              }
              label="Enable Ecommerce Module"
            />
            {/* Other items related to Ecommerce module */}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginBottom: '20px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="billpayment-content" id="billpayment-header">
          <Typography>Bill Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isBillPaymentEnabled}
                  onChange={() => setIsBillPaymentEnabled(!isBillPaymentEnabled)}
                />
              }
              label="Enable Bill Payment Module"
            />
            {/* Other items related to Ecommerce module */}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Paper>
</Grid>

      </Grid>
     
    </Container>
  );
};

export default AppSettingsPage;
