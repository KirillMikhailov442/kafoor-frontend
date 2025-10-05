import { FC } from 'react';
import styles from './QuizCard.module.scss';
import { Avatar, Badge, defineStyle } from '@chakra-ui/react';
import avatar_img from '@images/kafoor-user.webp';
import { FaPlay } from 'react-icons/fa';
import { IQuiz } from '@/types/Quiz';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

interface QuizCardProps
  extends Pick<IQuiz, 'id' | 'maxMember' | 'name' | 'endedAt'> {
  countMembers: number;
  countQuestions: number;
}

const QuizCard: FC<QuizCardProps> = ({
  id,
  name,
  maxMember,
  countMembers,
  countQuestions,
  endedAt,
}) => {
  return (
    <div className={styles.card} role="listitem">
      {/* <header className={styles.header}>
        <Avatar.Root css={ringCss} colorPalette={'black'}>
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src={avatar_img.src} />
        </Avatar.Root>
        <div>
          <h5 className={styles.name}>Fake</h5>
          <p className={styles.nickname}>@nickname</p>
        </div>
      </header> */}
      <p className={styles.title}>{name}</p>
      <footer className={styles.footer}>
        <div className="flex gap-2">
          <Badge colorPalette={'blue'} rounded={'sm'}>
            {countMembers}/{maxMember} мест
          </Badge>
          <Badge colorPalette={'green'} rounded={'sm'}>
            {countQuestions} вопросов
          </Badge>
        </div>
        {endedAt == 0 ? (
          <button className={styles.start}>
            <FaPlay size={16} />
          </button>
        ) : (
          <p className={styles.status}>Закончена (12.12.2020)</p>
        )}
      </footer>
    </div>
  );
};

export default QuizCard;
