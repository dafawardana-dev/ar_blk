import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Sesuaikan dengan port server Anda
});

export default api;