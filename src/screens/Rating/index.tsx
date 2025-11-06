'use client';

import { NextPage } from 'next';
import styles from './Rating.module.scss';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import { useRatingQuiz } from '@/hooks/Quiz';
import LoadingScreen from '../Loading';
import { useEffect, useMemo, useState } from 'react';
import { useGetUsersByIds } from '@/hooks/User';

const RatingScreen: NextPage = () => {
  const { push } = useRouter();
  const quizId = Number(useParams<{ id: string }>().id);
  const ratingQuiz = useRatingQuiz(quizId, data => {
    users.mutate(data.members.map(el => el.userId));
  });
  const users = useGetUsersByIds();
  const [rating, setRating] = useState([]);

  useEffect(() => {
    if (ratingQuiz.isLoading) return;
    const questionScoresMap = {};
    ratingQuiz.data.questions.forEach(question => {
      questionScoresMap[question.id] = question.scores;
    });

    const memberScores = {};

    ratingQuiz.data.answers.forEach(answer => {
      const memberId = answer.member.userId;
      const answerOption = answer.answer;

      const question = ratingQuiz.data.questions.find(q =>
        q.options.some(opt => opt.id === answerOption.id),
      );

      if (question && answerOption.correct) {
        if (!memberScores[memberId]) {
          memberScores[memberId] = {
            userId: memberId,
            score: 0,
          };
        }
        memberScores[memberId].score += question.scores;
        memberScores[memberId].correctAnswers += 1;
      }
    });

    ratingQuiz.data.members.forEach(member => {
      const userId = member.userId;
      if (!memberScores[userId]) {
        memberScores[userId] = {
          userId: userId,
          score: 0,
        };
      }
    });

    const sortedRating = Object.values(memberScores).sort(
      (a, b) => b.score - a.score,
    );

    setRating(sortedRating);
  }, [ratingQuiz.isLoading]);

  if (ratingQuiz.isLoading || users.isLoading) return <LoadingScreen />;

  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container)}>
        <p className={styles.leaders}>Рейтинг</p>
        <ul className={styles.rating}>
          {rating.map((item, index) => (
            <li
              key={item.userId}
              className={clsx(
                styles.ratingItem,
                index + 1 == 1 && styles.first,
                index + 1 == 2 && styles.second,
                index + 1 == 3 && styles.third,
              )}>
              <div className="flex gap-3 items-center">
                <h5 className={styles.number}>{++index}</h5>
                <p>
                  {users.data?.data.find(el => el.id == item.userId).nickname}
                </p>
              </div>
              <p className="!font-semibold">{item.score}</p>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => {
            push('/');
          }}
          variant={'plain'}
          color={'white'}
          className={styles.exit}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default RatingScreen;
