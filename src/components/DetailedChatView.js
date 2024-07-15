import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, TextField, Button, MenuItem, Select } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getChatMessages, getChats } from '../api';

const DetailedChatView = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messageColor, setMessageColor] = useState('#00ff00');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
      }
    };

    const fetchChatDetails = async () => {
      try {
        const allChats = await getChats();
        const selectedChat = allChats.find(chat => chat.id === parseInt(chatId));
        setChat(selectedChat);
      } catch (error) {
        console.error('Failed to fetch chat details:', error);
      }
    };

    fetchMessages();
    fetchChatDetails();
  }, [chatId]);

  const handleSendMessage = () => {
    const message = {
      id: Date.now(),
      message: newMessage,
      sender: 'me'
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const displayName = chat && (chat.creator.name && chat.creator.name.trim() !== '' ? chat.creator.name : chat.creator.phone);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, borderBottom: '1px solid #ddd' }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        {chat && (
          <Typography variant="h6">{displayName}</Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={message.id}
            sx={{
              margin: '10px',
              padding: '10px',
              backgroundColor: index % 2 === 0 ? messageColor : '#e0e0e0',
              borderRadius: '10px',
              maxWidth: '60%',
              alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
              textAlign: index % 2 === 0 ? 'right' : 'left'
            }}
          >
            <Typography variant="body2">{message.message}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ padding: 2, borderTop: '1px solid #ddd', display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Select
          value={messageColor}
          onChange={(e) => setMessageColor(e.target.value)}
          sx={{ marginLeft: 1 }}
        >
          <MenuItem value="#25D366">Lightgreen</MenuItem>
          <MenuItem value="#000000">Black</MenuItem>
          <MenuItem value="#ff0000">Red</MenuItem>
          <MenuItem value="#00ff00">Green</MenuItem>
          <MenuItem value="#0000ff">Blue</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ marginLeft: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default DetailedChatView;
