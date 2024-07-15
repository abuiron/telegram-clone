import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { getChats } from './api';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DetailedChatView from './components/DetailedChatView';
import ThemeProvider from './ThemeContext';

const App = () => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChats();
        setChats(data);
        setFilteredChats(data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };
    fetchChats();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredChats(chats);
    } else {
      setFilteredChats(chats.filter(chat => {
        const name = chat.creator.name || '';
        const phone = chat.creator.phone || '';
        return name.toLowerCase().includes(query.toLowerCase()) || phone.toLowerCase().includes(query.toLowerCase());
      }));
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Container maxWidth="xl">
          <Header onSearch={handleSearch} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Sidebar chats={filteredChats} />
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={8}>
                <Routes>
                  <Route path="/" element={<div>Select a chat to view messages</div>} />
                  <Route path="/chat/:chatId" element={<DetailedChatView />} />
                </Routes>
              </Grid>
            )}
            {isMobile && (
              <Routes>
                <Route path="/chat/:chatId" element={<DetailedChatView />} />
              </Routes>
            )}
          </Grid>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
