import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://neokaotik-server.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance };
