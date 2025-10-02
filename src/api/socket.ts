import io from 'socket.io-client';
import Cookies from 'js-cookie';

export const socket = io('http://localhost:8083', {
  transports: ['websocket', 'polling'], // Важно указать оба транспорта
  upgrade: true,
  forceNew: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  query: {
    userId: Cookies.get('token'),
  },
});

export enum SOCKET_ACTION {
  JOIN_QUIZ = 'JOIN_QUIZ',
  LEAVE_QUIZ = 'LEAVE_QUIZ',
  TELL_ABOUT_YOURSELF = 'TELL_ABOUT_YOURSELF',
}
