'use client';

import { NextPage } from 'next';
import Question from './components/Question';
import Podium from './components/Podium';
import Start from './components/Start';
import { useEffect } from 'react';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { useParams } from 'next/navigation';

const QuizScreen: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;

  useEffect(() => {
    socket.send(SOCKET_ACTION.JOIN_QUIZ, { id: quizId });
  }, []);

  return <Start />;
};

export default QuizScreen;
