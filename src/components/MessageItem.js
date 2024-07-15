import React from 'react';

const MessageItem = ({ message }) => {
    return (
        <div>
            <p>{message.text}</p>
        </div>
    );
};

export default MessageItem;
