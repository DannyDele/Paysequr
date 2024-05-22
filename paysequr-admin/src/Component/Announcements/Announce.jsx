import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Modal } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AnnouncementPage = () => {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" className='text-gray-800' gutterBottom>
        Create Announcement
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box mb={2}>
          <TextField
            label="Heading"
            fullWidth
            value={heading}
            onChange={handleHeadingChange}
          />
        </Box>
        <Box mb={2}>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={AnnouncementPage.modules}
            formats={AnnouncementPage.formats}
            style={{ height: '300px', marginBottom:'50px' }}
          />
        </Box>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
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
            {heading}
          </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: content }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={handleClose} sx={{ mr: 2 }}>
              OK
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

// Configuration for ReactQuill
AnnouncementPage.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

AnnouncementPage.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'link', 'image',
  'color', 'background',
  'script',
  'align',
  'direction',
  'video'
];

export default AnnouncementPage;
