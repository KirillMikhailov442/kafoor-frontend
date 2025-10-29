'use client';

import { FC, useEffect } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react';
import { useHoldingQuiz } from '@/store/holdingQuiz';
import { useTimer } from 'use-timer';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { IQuestion } from '@/types/Question';
import { IQuiz } from '@/types/Quiz';

const Header: FC = () => {
  const { question, step } = useHoldingQuiz();
  const { time, start } = useTimer({
    initialTime: question?.timeLimit,
    endTime: 0,
    interval: 1000,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    start();
  }, [step]);

  if (!question?.timeLimit || !localStorage.getItem('quiz')) return 'loading';

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
          {step + 1}/
          {
            (JSON.parse(localStorage.getItem('quiz') || '') as IQuiz)?.questions
              ?.length
          }
        </p>
      </div>
    </header>
  );
};

export default Header;
