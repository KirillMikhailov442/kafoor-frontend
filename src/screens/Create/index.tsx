'use client';

import { NextPage } from 'next';
import styles from './Create.module.scss';
import Header from './components/Header';
import Questions from './components/Questions';
import OptionQuestion from './components/OptionQuestion';
import EditQuestion from './components/EditQuestion';
import { useGetQuizWithoutEnabled } from '@/hooks/Quiz';
import { useParams } from 'next/navigation';
import LoadingScreen from '../Loading';
import { useEffect } from 'react';
import { useQuiz } from '@/store/quiz';
import { useDebounce } from 'use-debounce';

const CreateScreen: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;
  const quiz = useGetQuizWithoutEnabled(Number(quizId));
  const { store } = useQuiz();
  const [updatedQuiz] = useDebounce(store, 2000);

  useEffect(() => {
    quiz.refetch();
  }, []);

  useEffect(() => {
    console.log(updatedQuiz);
  }, [updatedQuiz]);

  if (quiz.isLoading) return <LoadingScreen />;
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Questions />
        <EditQuestion />
        <OptionQuestion />
      </main>
    </div>
  );
};

export default CreateScreen;
