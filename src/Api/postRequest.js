import axios from 'axios';
// const profile = localStorage?.getItem('profile');
// const { token } = JSON.parse(profile);
// const API = axios.create({ baseURL: 'http://localhost:5000', headers: { authorization: token } });
// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: process.env.BASE_PORT });

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);

export const likePost = (id, userId) => API.put(`posts/${id}/like`, { userId: userId });

export const commentPost = (body, postid, userId) =>  API.post('/posts/addComment',{body,postid,userId})

export const showCommetn = (postid) => API.post('/posts/showComments',{postid})

export const showPost = () => API.post('/posts/showPosts')

export const getUserPost = (id) => API.get(`/posts/${id}/getUserPost`)
