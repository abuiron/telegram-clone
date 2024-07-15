import React from 'react';
import { List, ListItem, ListItemText, Avatar } from '@mui/material';

const ChatList = ({ chats, onChatSelect }) => {
    return (
        <List>
            {chats.map((chat) => (
                <ListItem button key={chat.id} onClick={() => onChatSelect(chat)}>
                    <Avatar alt="Chat DP" src={`https://via.placeholder.com/150?text=${chat.id}`} />
                    <ListItemText primary={`Chat ${chat.id}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default ChatList;
