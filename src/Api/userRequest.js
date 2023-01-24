import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: process.env.BASE_PORT });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

export const getAlluser = () => API.get('/user');

export const followUSer = (id, data) => API.put(`/user/${id}/follow`, data);

export const unfollowUSer = (id, data) =>API.put(`/user/${id}/unfollow`, data);

export const SearchUsers = (keyword) => API.post('/user/SearchUsers', { keyword: keyword });

export const getMessage = (id,userid) =>{ console.log(id,userid,"kkkk")
 API.post('/chat',{id,userid})}
