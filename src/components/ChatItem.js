import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChatItem = ({ chat }) => {
  const navigate = useNavigate();

  const handleChatSelect = () => {
    navigate(`/chat/${chat.id}`);
  };

  const displayName = chat.creator.name && chat.creator.name.trim() !== 'null' ? chat.creator.name : chat.creator.phone;

  return (
    <ListItem button onClick={handleChatSelect}>
      <ListItemAvatar>
        <Avatar alt={displayName} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText 
        primary={displayName} 
        secondary={chat.status} 
      />
    </ListItem>
  );
};

export default ChatItem;
