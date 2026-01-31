import axios from 'axios';
import Cookies from 'js-cookie';
import {
  COOKIE_TOKEN_LIFESPAN,
  COOKIE_TOKEN_REFRESH_LIFESPAN,
} from '@/constants/cookies';

const authService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USERS_API,
});

authService.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authService.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }

    const isRefreshEndpoint =
      originalRequest.url?.includes('/update-tokens') ||
      originalRequest.url === '/api/v1/users/update-tokens';

    if (isRefreshEndpoint) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh-token');

      if (!refreshToken) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.patch(
          `${process.env.NEXT_PUBLIC_USERS_API}/api/v1/users/update-tokens`,
          { refreshToken },
        );

        Cookies.set('token', data.data.accessToken, {
          expires: COOKIE_TOKEN_LIFESPAN,
        });
        Cookies.set('refresh-token', data.data.refreshToken, {
          expires: COOKIE_TOKEN_REFRESH_LIFESPAN,
        });

        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return authService(originalRequest);
      } catch (err) {
        Cookies.remove('token');
        Cookies.remove('refresh-token');
        // window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

const quizService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QUIZZES_API,
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
