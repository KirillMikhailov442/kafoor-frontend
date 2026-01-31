'use client';

import clsx from 'clsx';
import styles from './Home.module.scss';
import { NextPage } from 'next';
import QuizCard from '@/components/Cards/Quiz';
import Loading from './Loading';
import { useGetMyQuizzes, useGetQuizzesMePartic } from '@/hooks/Quiz';
import NoResult from './NoResult';
import { useEffect } from 'react';
import QuizOfMemberCard from '@/components/Cards/QuizOfMember';

const HomeScreen: NextPage = () => {
  const { data, isLoading } = useGetMyQuizzes();
  const quizzessOfMember = useGetQuizzesMePartic();

  useEffect(() => {
    localStorage.removeItem('quiz');
    localStorage.removeItem('holding-quiz');
    localStorage.removeItem('count-questions');
    localStorage.removeItem('selected');
  }, []);

  if (isLoading || quizzessOfMember.isLoading) return <Loading />;
  if (data?.data.length == 0 && quizzessOfMember.data?.data.length == 0)
    return <NoResult />;

  return (
    <div className={clsx(styles.page)}>
      <div className={clsx('k-container', styles.container)}>
        {data?.data && data.data?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Ваши викторины</h3>
            <div className={styles.grid}>
              {data?.data?.map(quiz => (
                <QuizCard
                  {...quiz}
                  countMembers={quiz.members.length}
                  countQuestions={quiz.questions?.length || 0}
                  key={quiz.id}
                />
              ))}
            </div>
          </section>
        )}
        {quizzessOfMember.data && quizzessOfMember.data.data?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Викторины, в которых я участвовал
            </h3>
            <div className={styles.grid}>
              {quizzessOfMember?.data.data?.map(quiz => (
                // @ts-ignore
                <QuizOfMemberCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
