import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
                © 2024 Telegram Replica
            </Typography>
        </Box>
    );
};

export default Footer;
