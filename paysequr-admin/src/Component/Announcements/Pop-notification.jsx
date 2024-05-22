import React, { useState } from 'react';
import { Button, Typography, Box, Modal, Paper } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PopNotificationPage = () => {
  const [notificationText, setNotificationText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleNotificationChange = (value) => {
    const text = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    if (wordCount > 20) {
      setErrorMessage('Notification should contain a maximum of 20 words.');
    } else {
      setErrorMessage('');
    }
    setNotificationText(value);
  };

  const handleNotificationSubmit = () => {
    const text = notificationText.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    if (wordCount <= 20) {
      setOpen(true);
    } else {
      setErrorMessage('Notification should contain a maximum of 20 words.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNotificationText('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', marginLeft: '20px' }}>
      <Typography variant="h4" className='text-gray-800' gutterBottom>
        Pop Notification
      </Typography>
      <ReactQuill
        value={notificationText}
        onChange={handleNotificationChange}
        modules={PopNotificationPage.modules}
        formats={PopNotificationPage.formats}
        style={{ height: '200px', marginBottom: '50px' }}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button variant="outlined" color="primary" onClick={handleNotificationSubmit}>
        Submit Notification
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 0
          }}
        >
          <Typography variant="h5" gutterBottom>
            Notification Preview
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: notificationText }} />
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, }}>
            <Button variant="outlined" color="primary" onClick={handleClose} sx={{ mr: 2 }}>
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

PopNotificationPage.modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

PopNotificationPage.formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'blockquote', 'code-block',
  'list', 'bullet', 'indent', 'align',
  'link', 'image', 'video'
];

export default PopNotificationPage;
