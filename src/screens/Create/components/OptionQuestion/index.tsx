'use client';

import { FC, useEffect, useState } from 'react';
import styles from './OptionQuestion.module.scss';
import Select from '@/components/UI/Select';
import { useQuiz } from '@/store/quiz';
import clsx from 'clsx';

const OptionQuestion: FC = () => {
  const { store, index, editQuestionLimit, editQuestionPoints } = useQuiz();
  const [key, setKey] = useState(0);
  const [limit, setLimit] = useState(String(store[index].limit));
  const [points, setPoints] = useState(String(store[index].points));

  useEffect(() => {
    console.log(limit, points);
  }, [limit, points]);

  useEffect(() => {
    setKey(prev => ++prev);
  }, [index, store.length]);

  if (store.length == 0 || index == undefined)
    return (
      <aside className={clsx(styles.side, styles.empty)}>
        <h6>Выберите вопрос</h6>
      </aside>
    );

  return (
    <aside key={key} className={styles.side}>
      <Select
        onValueChange={details =>
          editQuestionLimit(index, Number(details.value[0]))
        }
        defaultValue={[String(store[index].limit)]}
        items={[
          {
            label: '10 секунд',
            value: '10',
          },
          {
            label: '15 секунд',
            value: '15',
          },
          {
            label: '20 секунд',
            value: '20',
          },
          {
            label: '25 секунд',
            value: '25',
          },
          {
            label: '30 секунд',
            value: '30',
          },
        ]}
        label="Время"
        text="Время на вопрос"
      />
      <Select
        onValueChange={details =>
          editQuestionPoints(index, Number(details.value[0]))
        }
        defaultValue={[String(store[index].points)]}
        items={[
          {
            label: '1 балл',
            value: '1',
          },
          {
            label: '5 балл',
            value: '5',
          },
          {
            label: '10 балл',
            value: '10',
          },
          {
            label: '25 балл',
            value: '25',
          },
          {
            label: '50 балл',
            value: '50',
          },
          {
            label: '100 балл',
            value: '100',
          },
        ]}
        label="Баллы"
        text="Баллы за правильный ответ"
      />
    </aside>
  );
};

export default OptionQuestion;
