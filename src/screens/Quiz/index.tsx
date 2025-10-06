'use client';

import { NextPage } from 'next';
import Question from './components/Question';
import Podium from './components/Podium';
import Start from './components/Start';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
socket.connect();

const QuizScreen: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;
  useEffect(() => {
    socket.on('disconnect', () => {
      socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, {
        socketId: socket.id,
        quizId,
      });
    });
  }, []);
  return <Start />;
};

export default QuizScreen;
