import axios from 'axios';
import Cookies from 'js-cookie';

const authService = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      'Bearer ' + (Cookies.get('token') ? Cookies.get('token') : null),
  },
});

export { authService };
