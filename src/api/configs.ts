import axios from 'axios';
import Cookies from 'js-cookie';
import UserService from '@api/services/User';
import {
  COOKIE_TOKEN_LIFESPAN,
  COOKIE_TOKEN_REFRESH_LIFESPAN,
} from '@/constants/cookies';

const authService = axios.create({
  baseURL: 'http://localhost:8081',
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

authService.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (originalRequest.url == '/api/v1/users/update-tokens') throw error;
    if (!originalRequest) throw error;

    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh-token');

      if (refreshToken) {
        try {
          const { data } = await UserService.updateTokens(refreshToken);
          console.log(data);

          Cookies.set('token', data.data.accessToken, {
            expires: COOKIE_TOKEN_LIFESPAN,
          });
          Cookies.set('refresh-token', data.data.refreshToken, {
            expires: COOKIE_TOKEN_REFRESH_LIFESPAN,
          });
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return authService(originalRequest);
        } catch (err) {
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const quizService = axios.create({
  baseURL: 'http://localhost:8082',
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
