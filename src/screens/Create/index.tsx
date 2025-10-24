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

const CreateScreen: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;
  const quiz = useGetQuizWithoutEnabled(quizId, ({ data }) => {
    editQuiz({ name: data.name, maxMembers: data.maxMembers });
    setStore(data.questions);
    
  });
  const { editQuiz, setStore } = useQuiz();

  useEffect(() => {
    quiz.refetch();
  }, []);

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
