import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, IconButton, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { Search, Phone as PhoneIcon,ArrowBack ,AttachFile} from '@mui/icons-material'; // Import the PhotoCamera, Search, and Phone icons
import { InputAdornment} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'User 1', content: 'Hello!', timestamp: '2024-03-13 10:00:00' },
    { sender: 'User 2', content: 'Hi there!', timestamp: '2024-03-13 10:02:00' },
    { sender: 'User 1', content: 'How are you?', timestamp: '2024-03-13 10:05:00' },
    { sender: 'User 2', content: 'I am good, thanks!', timestamp: '2024-03-13 10:07:00' },
  ]);
  const handleUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      console.log('Selected file:', file);
      // You can handle the selected file here, like uploading it to a server
    };
    fileInput.click();
  };
  // Function to handle sending a message
  const sendMessage = () => {
    if (message.trim() === '') return;

    // Construct the message object with sender, content, and timestamp
    const newMessage = {
      sender: 'User 1', // Assume the sender is User 1 for this example
      content: message,
      timestamp: new Date().toLocaleString(), // Use local time format for timestamp
    };

    // Add the new message to the chat messages array
    setChatMessages([...chatMessages, newMessage]);

    // Clear the message input field
    setMessage('');
  };

  // Function to handle searching users
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement your search logic here, such as filtering the user list based on the search query
  };

  // Function to check if date has changed
  const isDateChanged = (index) => {
    if (index === 0) return true;
    const currentDate = new Date(chatMessages[index].timestamp).toLocaleDateString();
    const previousDate = new Date(chatMessages[index - 1].timestamp).toLocaleDateString();
    return currentDate !== previousDate;
  };

  return (
    <Container style={{ height: '100vh', marginTop: '25px' }}>
      <Grid container spacing={2} style={{ height: '100%' }}>
        {/* List of Contacts */}
        <Grid item xs={12} sm={4} style={{ height: '100%', paddingRight: 0 }}>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', maxHeight: '100%', overflowY: 'auto', borderRadius: 0 }}>
            <Typography variant="h6" gutterBottom style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              Contacts
            </Typography>
            {/* Search bar */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <TextField
                label="Search users"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </div>
            <List>
              <ListItem button style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Avatar src={`user1.jpg`} alt={`User 1`} style={{ marginRight: '20px' }} />
                <ListItemText primary={`Sender`} />
              </ListItem>
              <ListItem button style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Avatar src={`user2.jpg`} alt={`User 2`} style={{ marginRight: '20px' }} />
                <ListItemText primary={`Receiver`} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        {/* Chat Messages */}
        <Grid item xs={12} sm={8} style={{ height: 'calc(100vh - 25px)', overflow: 'auto' }}>
          {/* Chat Paper */}
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', maxHeight: '100%', overflowY: 'auto', borderRadius: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
  {/* User information */}
 
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* Dummy image */}
    <IconButton onClick={() => window.history.back()}>
    <ArrowBack />
  </IconButton>
    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '15px' }}></div>
    {/* User name */}
    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#333', marginRight: '15px' }}>
      User 2
    </Typography>
    {/* Phone icon */}
   
  </div>
   <IconButton color="primary" aria-label="phone">
      <PhoneIcon />
    </IconButton>
  {/* Back arrow */}
 
</div>

            {/* Line beneath the header */}
            <div style={{ borderBottom: '2px solid #ccc', marginBottom: '10px' }}></div>
            {chatMessages.map((msg, index) => (
              // Inside the map function where chat messages are rendered
              <React.Fragment key={index}>
                {isDateChanged(index) && (
                  <Typography variant="caption" style={{ textAlign: 'center', marginBottom: '10px' }}>
                  {new Date(msg.timestamp).toLocaleDateString()}
                </Typography>
                )}
                <div style={{ textAlign: msg.sender === 'User 1' ? 'right' : 'left' }}>
                  {/* Chat message bubbles */}
                  <Paper
                    elevation={1}
                    style={{
                      marginTop:'20px',
                      marginBottom: '10px',
                      padding: '10px',
                      borderRadius: '15px',
                      maxWidth: '60%',
                      background: msg.sender === 'User 1' ? '#fff' : '#f2f2f2', // Different background color for sender and receiver
                      color: '#000', // Fixed color for text
                      marginLeft: msg.sender === 'User 1' ? 'auto' : '0',
                    }}
                  >
                    {/* Removed sender's name from the chat bubble */}
                    <Typography variant="body1" style={{ marginBottom: '5px' }}>
                      {msg.content}
                    </Typography>
                    <Typography variant="caption" style={{ textAlign: 'right' }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Paper>
                </div>
              </React.Fragment>
            ))}
            {/* Reply Message input field */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
              <TextField
  label="Type your message"
  variant="outlined"
  fullWidth
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  style={{width:'150%'}}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleUpload}>
  <AttachFile />
</IconButton>
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatBox;
