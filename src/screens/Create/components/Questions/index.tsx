'use client';

import { FC, useRef } from 'react';
import styles from './Questions.module.scss';
import Slide from './Slide';
import { useQuiz } from '@/store/quiz';
import { Button } from '@chakra-ui/react';

const Questions: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { store, index, setIndex, removeQuestion, addQuestion } = useQuiz();
  return (
    <aside className={styles.side}>
      <div ref={scrollRef} className={styles.sideContent}>
        {store?.map(({ id }, i) => (
          <Slide
            onClick={() => setIndex(i)}
            onDelete={() => removeQuestion(i)}
            key={id}
            index={i}
            isActive={i == index}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          addQuestion();
          setTimeout(() => {
            scrollRef.current?.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
          setIndex(store.length);
        }}
        className={styles.add}
        variant={'plain'}>
        Добавить вопрос
      </Button>
    </aside>
  );
};

export default Questions;
