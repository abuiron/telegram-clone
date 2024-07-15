import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ chats }) => {
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <List>
      {chats.map((chat) => (
        <ListItem button key={chat.id} onClick={() => handleChatClick(chat.id)}>
          <ListItemAvatar>
            <Avatar alt={chat.creator.name || chat.creator.phone} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={chat.creator.name || chat.creator.phone} secondary={chat.status} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
