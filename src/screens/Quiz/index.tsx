'use client';

import { NextPage } from 'next';
import Question from './components/Question';
import Podium from './components/Podium';
import Start from './components/Start';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { useEffect } from 'react';
import { useHoldingQuiz } from '@/store/holdingQuiz';
import { IQuestion } from '@/types/Question';

socket.connect();
const QuizScreen: NextPage = () => {
  const { stage } = useHoldingQuiz();

  if (stage == 'expectation') return <Start />;
  if (stage == 'passing') return <Question />;
};

export default QuizScreen;
