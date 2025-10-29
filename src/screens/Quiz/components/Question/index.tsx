import { NextPage } from 'next';
import styles from './Question.module.scss';
import Header from '../Header';
import clsx from 'clsx';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { IQuestion } from '@/types/Question';
import { useHoldingQuiz } from '@/store/holdingQuiz';
import Option from '@/components/Option';
import { useEffect, useState } from 'react';
import { useTimer } from 'use-timer';

const Question: NextPage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const { question, step } = useHoldingQuiz();

  return (
    <div className="wrapper-bg-blue">
      <Header />
      <div className="flex flex-grow">
        <div className={clsx('k-container', styles.content)}>
          <div className={styles.top}>
            <h4 className={styles.text}>{question?.text}</h4>
          </div>
          <div className={styles.bottom}>
            {question?.options?.map((option, index) => (
              <Option
                number={++index}
                key={option.id}
                onCheck={value => {
                  if (value) setSelected(prev => [...prev, option.id]);
                  else
                    setSelected(prev => prev.filter(item => item != option.id));
                }}
                text={option.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
