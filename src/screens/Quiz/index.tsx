'use client';

import { NextPage } from 'next';
import Question from './components/Question';
import Podium from './components/Podium';
import Start from './components/Start';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { useParams } from 'next/navigation';
socket.connect();

const QuizScreen: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;
  return <Start />;
};

export default QuizScreen;
