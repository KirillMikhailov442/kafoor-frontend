'use client';

import { NextPage } from 'next';
import Question from './components/Question';
import Podium from './components/Podium';
import Start from './components/Start';
import { socket } from '@/api/socket';
socket.connect();

const QuizScreen: NextPage = () => {
  return <Start />;
};

export default QuizScreen;
