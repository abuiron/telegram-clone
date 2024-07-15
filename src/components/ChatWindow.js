import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getChatMessages } from '../api';
import { ThemeContext } from '../ThemeContext';

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const { messageColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (chat) {
      const fetchMessages = async () => {
        const data = await getChatMessages(chat.id);
        setMessages(data);
      };
      fetchMessages();
    }
  }, [chat]);

  return (
    <Box>
      {chat ? (
        <>
          <Typography variant="h6">{chat.creator.name || chat.creator.phone}</Typography>
          <Button onClick={() => navigate(`/chat/${chat.id}`)}>Open Chat</Button>
          <Box>
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
        </>
      ) : (
        <Typography>Select a chat to view messages</Typography>
      )}
    </Box>
  );
};

export default ChatWindow;
