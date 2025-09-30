import axios from 'axios';
import Cookies from 'js-cookie';

const authService = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      'Bearer' + (Cookies.get('token') ? Cookies.get('token') : null),
  },
});

authService.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const quizService = axios.create({
  baseURL: 'http://localhost:8002',
  headers: {
    Authorization:
      'Bearer' + (Cookies.get('token') ? Cookies.get('token') : null),
  },
});

quizService.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export { authService, quizService };
