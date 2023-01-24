import axios from "axios";

// const API = axios.create({baseURL:"http://localhost:5000"})
const API = axios.create({ baseURL: process.env.BASE_PORT });

export const userChats=(id)=> API.get(`/chat/${id}`)