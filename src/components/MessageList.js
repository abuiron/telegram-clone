import React from 'react';
import MessageItem from './MessageItem'

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}
        </div>
    );
};

export default MessageList;
