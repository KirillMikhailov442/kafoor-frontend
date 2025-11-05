import io from 'socket.io-client';
import Cookies from 'js-cookie';

export const socket = io('http://localhost:8083', {
  transports: ['websocket', 'polling'],
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
  JOIN_TO_QUIZ = 'JOIN_TO_QUIZ',
  LEAVE_FROM_QUIZ = 'LEAVE_FROM_QUIZ',
  TELL_ABOUT_YOURSELF = 'TELL_ABOUT_YOURSELF',
  START_QUIZ = 'START_QUIZ',
  FINISH_QUIZ = 'FINISH_QUIZ',
  NEXT_QUESTION = 'NEXT_QUESTION',
  TELL_CORRECT_ANSWER = 'TELL_CORRECT_ANSWER',
  SAY_MY_ANSWER = 'SAY_MY_ANSWER',
  TELL_RATING = 'TELL_RATING',
}
