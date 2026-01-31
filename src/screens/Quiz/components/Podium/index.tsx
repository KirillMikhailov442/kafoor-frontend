import { FC, useEffect, useState } from 'react';
import styles from './Podium.module.scss';
import clsx from 'clsx';
import { useHoldingQuiz } from '@/store/holdingQuiz';
import { IQuiz } from '@/types/Quiz';
import { Button } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { useFinishQuiz } from '@/hooks/Quiz';

interface IRating {
  id: number;
  nickname: string;
  scores: number;
}

const Podium: FC = () => {
  const quizId = Number(useParams<{ id: string }>().id);
  const { push } = useRouter();
  const { members, answers } = useHoldingQuiz();
  const [rating, setRating] = useState<IRating[]>([]);
  const finishQuiz = useFinishQuiz();
  const quiz = localStorage.getItem('quiz')
    ? (JSON.parse(localStorage.getItem('quiz') || '') as IQuiz)
    : undefined;

  useEffect(() => {
    setRating(
      members.map(item => ({
        id: item.userId,
        nickname: item.nickname,
        scores: 0,
      })),
    );
  }, []);

  useEffect(() => {
    if (!quiz) return;
    const corrects = quiz.questions.map(question => {
      return question.options
        ?.filter(item => item.correct)
        .map(item => item.id);
    });

    const scoresOfMembers: IRating[] = [];
    Object.entries(answers).forEach(([userId, answersList]) => {
      let scores = 0;
      // @ts-ignore
      answersList.forEach((item, index) => {
        if (corrects[index]?.includes(item.answer))
          scores += quiz.questions[index].scores;
      });
      scoresOfMembers.push({
        id: Number(userId),
        scores,
        nickname: members.find(el => el.userId == Number(userId))
          ?.nickname as string,
      });
    });
    setRating(scoresOfMembers.sort((a, b) => b.scores - a.scores));
  }, []);

  useEffect(() => {
    if (rating.length == 0 || !quiz) return;
    socket.emit(SOCKET_ACTION.TELL_RATING, { quizId: quiz?.id, rating });

    // @ts-ignore
    finishQuiz.mutate({ quizId, answers });
  }, [rating.length]);

  useEffect(() => {
    socket.on(SOCKET_ACTION.TELL_RATING, (rating: IRating[]) =>
      setRating(rating),
    );
  }, []);

  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container)}>
        <p className={styles.leaders}>Рейтинг</p>
        <ul className={styles.rating}>
          {rating.map((item, index) => (
            <>
              <li
                key={item.id}
                className={clsx(
                  styles.ratingItem,
                  index + 1 == 1 && styles.first,
                  index + 1 == 2 && styles.second,
                  index + 1 == 3 && styles.third,
                )}>
                <div className="flex gap-3 items-center">
                  <h5 className={styles.number}>{++index}</h5>
                  <p>{item.nickname}</p>
                </div>
                <p className="!font-semibold">{item.scores}</p>
              </li>
            </>
          ))}
        </ul>
        <Button
          onClick={() => {
            socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, {
              quizId,
              socketId: socket.id,
            });
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

export default Podium;
