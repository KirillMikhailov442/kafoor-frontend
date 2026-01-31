'use client';

import { NextPage } from 'next';
import styles from './Rating.module.scss';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import { useRatingQuiz } from '@/hooks/Quiz';
import LoadingScreen from '../Loading';
import { useEffect, useState } from 'react';
import { useGetUsersByIds } from '@/hooks/User';

interface RatingItem {
  userId: number;
  score: number;
  correctAnswers?: number;
}

interface MemberScore {
  userId: number;
  score: number;
  correctAnswers?: number;
}

const RatingScreen: NextPage = () => {
  const { push } = useRouter();
  const params = useParams<{ id: string }>();
  const quizId = Number(params.id);

  const ratingQuiz = useRatingQuiz(quizId, data => {
    if (data?.members) {
      users.mutate(data.members.map(el => el.userId));
    }
  });

  const users = useGetUsersByIds();
  const [rating, setRating] = useState<RatingItem[]>([]);

  useEffect(() => {
    if (ratingQuiz.isLoading || !ratingQuiz.data) return;

    const questionScoresMap: Record<number, number> = {};
    ratingQuiz.data.questions.forEach(question => {
      questionScoresMap[question.id] = question.scores;
    });

    const memberScores: Record<number, MemberScore> = {};

    ratingQuiz.data.answers.forEach(answer => {
      const memberId = answer.member.userId;
      const answerOption = answer.answer;

      const question = ratingQuiz.data?.questions.find(q =>
        q.options?.some(opt => opt.id === answerOption.id),
      );

      if (question && answerOption.correct) {
        if (!memberScores[memberId]) {
          memberScores[memberId] = {
            userId: memberId,
            score: 0,
            correctAnswers: 0,
          };
        }
        memberScores[memberId].score =
          memberScores[memberId].score + (question.scores || 0);
        memberScores[memberId].correctAnswers! += 1;
      }
    });

    ratingQuiz.data.members.forEach(member => {
      const userId = member.userId;
      if (!memberScores[userId]) {
        memberScores[userId] = {
          userId: userId,
          score: 0,
          correctAnswers: 0,
        };
      }
    });

    const sortedRating = Object.values(memberScores).sort(
      (a, b) => b.score - a.score,
    );

    setRating(sortedRating);
  }, [ratingQuiz.isLoading, ratingQuiz.data]);

  if (ratingQuiz.isLoading || users.isLoading) return <LoadingScreen />;

  const userData = users.data?.data || [];

  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container)}>
        <p className={styles.leaders}>{ratingQuiz.data?.name} - Рейтинг</p>
        <ul className={styles.rating}>
          {rating.map((item, index) => {
            // @ts-ignore
            const user = userData.find(el => el.id === item.userId);
            return (
              <li
                key={item.userId}
                className={clsx(
                  styles.ratingItem,
                  index === 0 && styles.first,
                  index === 1 && styles.second,
                  index === 2 && styles.third,
                )}>
                <div className="flex gap-3 items-center">
                  <h5 className={styles.number}>{index + 1}</h5>
                  <p>{user?.nickname || `User ${item.userId}`}</p>
                </div>
                <p className="!font-semibold">{item.score}</p>
              </li>
            );
          })}
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
