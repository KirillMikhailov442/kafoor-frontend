'use client';

import { NextPage } from 'next';
import Question from './components/Question';
import Podium from './components/Podium';
import Start from './components/Start';
import { socket } from '@/api/socket';
import { useHoldingQuiz } from '@/store/holdingQuiz';

socket.connect();
const QuizScreen: NextPage = () => {
  const { stage } = useHoldingQuiz();

  if (stage == 'expectation') return <Start />;
  else if (stage == 'passing') return <Question />;
  else if (stage == 'finish') return <Podium />;
};

export default QuizScreen;
