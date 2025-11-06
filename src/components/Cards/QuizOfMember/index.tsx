import { FC } from 'react';
import styles from './QuizOfMember.module.scss';
import { IMember } from '@/types/Member';
import { parseDate } from '@/helpers/date';
import Link from 'next/link';

const QuizOfMemberCard: FC<IMember> = ({ quizId, quizName, createdAt }) => {
  return (
    <Link href={`/ratings/${quizId}`} className={styles.card} role="listitem">
      <p className={styles.title}>{quizName}</p>
      <footer className={styles.footer}>
        <div className="flex gap-2"></div>
        <p className={styles.status}>
          Участвовал: {parseDate(createdAt, 'DD MMMM YYYY')}
        </p>
      </footer>
    </Link>
  );
};

export default QuizOfMemberCard;
