import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ChatBubbleOutline } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  messageContainer: {
    width: '100%',
    minHeight: '300px',
    maxHeight: '500px',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  messageInput: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const Message = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

const MessagingSystem = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Simulated real-time messaging with useEffect
  useEffect(() => {
    // Simulated initial messages
    setMessages([
      { id: uuidv4(), text: 'Hello! How can I help you?' },
      { id: uuidv4(), text: 'Sure, let me check that for you.' },
    ]);

    // Simulated receiving new messages
    const interval = setInterval(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: uuidv4(), text: 'I will get back to you shortly.' },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMessageSend = () => {
    if (newMessage.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: uuidv4(), text: newMessage },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className={classes.root}>
      <h2>Messaging System</h2>
      <div className={classes.messageContainer}>
        {messages.map(message => (
          <Message key={message.id} text={message.text} />
        ))}
      </div>
      <TextField
        className={classes.messageInput}
        label="Type your message here"
        variant="outlined"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleMessageSend}
        startIcon={<ChatBubbleOutline />}
      >
        Send
      </Button>
    </div>
  );
};

export default MessagingSystem;
