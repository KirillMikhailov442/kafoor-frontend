import axios from 'axios';

const authService = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export { authService };
