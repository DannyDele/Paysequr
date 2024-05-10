import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  FormGroup,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  IconButton,
  Box // Import Box component from MUI
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon from MUI
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Import the file icon component

const ImageDialog = ({ open, handleClose, image, title, body, handleTitleChange, handleBodyChange, handleFileChange, saveChanges }) => {
  const [previewImage, setPreviewImage] = useState(null); // State to store the preview of the newly selected image

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {previewImage && (
          <img src={previewImage} alt="Preview" style={{ maxWidth: '50%', marginBottom: '16px' }} />
        )}
        {!previewImage && (
          <img src={image} alt={title} style={{ maxWidth: '50%' }} />
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileInput}
          id="file-input" // Add an id to the input element
        />
        <label htmlFor="file-input">
          <IconButton component="span"> {/* IconButton wrapped in label to trigger file input */}
            <AttachFileIcon />
          </IconButton>
        </label>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          value={body}
          onChange={handleBodyChange}
          fullWidth
          multiline
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={saveChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image file

  const handleImageClick = (item) => {
    setSelectedItem(item);
    setEditedTitle(item.title);
    setEditedBody(item.body);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleCommissionChange = (event) => {
    setCommission(event.target.value);
  };

  const handleCapChange = (event) => {
    setCap(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setEditedBody(event.target.value);
  };

  const handleFileChange = (file) => {
    setSelectedImage(file);
  };

  const handleSaveChanges = () => {
    // Update the selected item with the edited title and body
    const updatedItem = { ...selectedItem, title: editedTitle, body: editedBody };
    // Update the image if a new image has been selected
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      updatedItem.image = imageUrl;
    }
    // Perform any necessary logic to save the changes
    // For now, just close the dialog
    setDialogOpen(false);
    setSelectedItem(updatedItem);
    setSelectedImage(null); // Reset selected image after saving
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.style.backgroundColor = '#333';
      document.documentElement.style.color = '#fff';
    } else {
      document.documentElement.style.backgroundColor = '#fff';
      document.documentElement.style.color = '#000';
    }
  }, [isDarkMode]);

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  const renderPlaceholderImages = () => {
    const placeholderData = [
      { id: 1, title: 'Title 1', body: 'Body 1' },
      { id: 2, title: 'Title 2', body: 'Body 2' },
      { id: 3, title: 'Title 3', body: 'Body 3' },
      { id: 4, title: 'Title 4', body: 'Body 4' }
    ];

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
       {placeholderData.map((item) => (
         <Box key={item.id} p={2} textAlign="center">
           <img
             src={`https://via.placeholder.com/300x200?text=Image${item.id}`}
             alt={`Image ${item.id}`}
             style={{ width: 300, height: 200, borderRadius: '8px', cursor: 'pointer' }}
             onClick={() => handleImageClick(item)}
           />
           <Typography variant="h6">{item.title}</Typography>
           <Typography>{item.body}</Typography>
           {/* Edit icon */}
           <IconButton onClick={() => handleImageClick(item)}>
             <EditIcon />
           </IconButton>
         </Box>
       ))}
     </Box>
   );
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
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
                label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
              />
            </FormGroup>
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
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom style={{ color: isDarkMode ? '#fff' : '#000', marginBottom: '20px' }}>Mobile App Splash Screen</Typography>
            {/* Placeholder images */}
            {renderPlaceholderImages()}
            <ImageDialog
              open={dialogOpen}
              handleClose={handleCloseDialog}
              image={selectedItem ? selectedItem.image : ''}
              title={editedTitle}
              body={editedBody}
              handleTitleChange={handleTitleChange}
              handleBodyChange={handleBodyChange}
              handleFileChange={handleFileChange}
              saveChanges={handleSaveChanges}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppSettingsPage;
