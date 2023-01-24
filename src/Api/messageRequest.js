import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: process.env.BASE_PORT });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);
