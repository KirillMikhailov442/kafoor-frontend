'use client';

import clsx from 'clsx';
import styles from './Home.module.scss';
import { NextPage } from 'next';
import QuizCard from '@/components/Cards/Quiz';
import Loading from './Loading';
import { useGetMyQuizzes } from '@/hooks/Quiz';
import NoResult from './NoResult';
import { useEffect } from 'react';

const HomeScreen: NextPage = () => {
  const { data, isLoading, isSuccess } = useGetMyQuizzes();

  useEffect(() => {
    localStorage.removeItem('quiz');
    localStorage.removeItem('holding-quiz');
    localStorage.removeItem('count-questions');
    localStorage.removeItem('selected');
  }, []);

  if (isLoading) return <Loading />;
  if (data?.data.length == 0 && isSuccess) return <NoResult />;
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx('k-container', styles.container)}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ваши викторины</h3>
          <div className={styles.grid}>
            {data?.data.map(quiz => (
              <QuizCard
                {...quiz}
                countMembers={quiz.members.length}
                countQuestions={quiz.questions.length}
                key={quiz.id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
