'use client';

import { FC, useEffect } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react';
import { useHoldingQuiz } from '@/store/holdingQuiz';
import { useTimer } from 'use-timer';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { IQuiz } from '@/types/Quiz';
import { useParams } from 'next/navigation';
import { useProfile } from '@/hooks/User';

const Header: FC = () => {
  const { question, step, countQuestions, selectedOptions, finish, nextStep } =
    useHoldingQuiz();
  const quizId = Number(useParams<{ id: string }>().id);
  const profile = useProfile();

  const { time, start, reset } = useTimer({
    initialTime: question?.timeLimit,
    endTime: 0,
    interval: 1000,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      if (localStorage.getItem('quiz')) {
        const corrects = (
          JSON.parse(localStorage.getItem('quiz') || '') as IQuiz
        ).questions[step].options
          ?.filter(item => item.correct)
          .map(item => item.id);

        socket.emit(SOCKET_ACTION.TELL_CORRECT_ANSWER, { quizId, corrects });
        setTimeout(() => {
          if (step + 1 == countQuestions) {
            socket.emit(SOCKET_ACTION.FINISH_QUIZ, { quizId });
            finish();
          } else {
            socket.emit(SOCKET_ACTION.NEXT_QUESTION, {
              quizId,
              question: (
                JSON.parse(localStorage.getItem('quiz') || '') as IQuiz
              ).questions[step + 1],
            });
          }
        }, 3000);
      } else {
        socket.emit(SOCKET_ACTION.SAY_MY_ANSWER, {
          quizId,
          questionId: question?.id,
          userId: profile.data?.data.id,
          answer: selectedOptions,
        });
      }
    },
  });

  useEffect(() => {
    reset();
    start();
  }, [step]);

  if (!question) return 'loading';

  return (
    <header className={styles.header}>
      <div className={clsx('k-container', styles.container)}>
        <ProgressCircle.Root value={time} min={0} max={question.timeLimit}>
          <ProgressCircle.Circle min={0} max={time}>
            <ProgressCircle.Track stroke={'transparent'} />
            <ProgressCircle.Range stroke={'whiteAlpha.500'} />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <p className={styles.progressNum}>{time}</p>
          </AbsoluteCenter>
        </ProgressCircle.Root>
        <p className={styles.step}>
          {step + 1}/{countQuestions}
        </p>
      </div>
    </header>
  );
};

export default Header;
