import axios from 'axios';

export const getChats = async () => {
  try {
    const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error; // Rethrow the error for higher-level handling
  }
};
