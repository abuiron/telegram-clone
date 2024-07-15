import axios from 'axios';

export const getChats = async () => {
  const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
  return response.data.data.data;
};

export const getChatMessages = async (chatId) => {
  const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
  return response.data.data;
};
