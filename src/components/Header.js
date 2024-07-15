import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Menu, MenuItem, InputBase, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeContext } from '../ThemeContext';

const Header = ({ onSearch }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Telegram Clone
        </Typography>
        {searchOpen && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '50%' }}>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSearch(e.target.value)}
              sx={{ color: 'inherit', ml: 1, flex: 1 }}
            />
          </Box>
        )}
        <IconButton color="inherit" onClick={handleSearchToggle}>
          <SearchIcon />
        </IconButton>
        <Switch checked={mode === 'dark'} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
