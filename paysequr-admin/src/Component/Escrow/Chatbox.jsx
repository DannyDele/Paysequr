import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material'; // Import the PhotoCamera icon

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'User 1', content: 'Hello!', timestamp: '2024-03-13 10:00:00' },
    { sender: 'User 2', content: 'Hi there!', timestamp: '2024-03-13 10:02:00' },
    { sender: 'User 1', content: 'How are you?', timestamp: '2024-03-13 10:05:00' },
    { sender: 'User 2', content: 'I\'m good, thanks!', timestamp: '2024-03-13 10:07:00' },
  ]);

  // Function to handle sending a message
  const sendMessage = () => {
    if (message.trim() === '') return;

    // Construct the message object with sender, content, and timestamp
    const newMessage = {
      sender: 'User 1',
      content: message,
      timestamp: new Date().toLocaleString(), // Use local time format for timestamp
    };

    // Add the new message to the chat messages array
    setChatMessages([...chatMessages, newMessage]);

    // Clear the message input field
    setMessage('');
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Chat Page
      </Typography>
      {/* Chat messages */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        {chatMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'User 1' ? 'right' : 'left' }}>
            <Typography
              variant="body1"
              style={{
                fontWeight: 'bold',
                color: msg.sender === 'User 1' ? '#3f51b5' : '#f50057',
              }}
            >
              {msg.sender}:
            </Typography>
            <Typography variant="body1">
              {msg.content}
            </Typography>
            <Typography variant="caption" style={{ color: 'gray' }}>
              {msg.timestamp}
            </Typography>
          </div>
        ))}
      </Paper>
      {/* Message input field */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* Icon button for uploading image */}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  // Process the uploaded image here
                };
              }
            }}
          />
          <label htmlFor="raised-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatBox;
