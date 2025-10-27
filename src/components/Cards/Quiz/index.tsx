import { FC } from 'react';
import styles from './QuizCard.module.scss';
import { Badge, Menu, Portal } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { IQuiz } from '@/types/Quiz';
import Link from 'next/link';
import { Pencil, Play, Trash } from 'lucide-react';
import { useModals } from '@/store/modals';
import { useRouter } from 'next/navigation';

interface QuizCardProps
  extends Pick<IQuiz, 'id' | 'maxMembers' | 'name' | 'endedAt'> {
  countMembers: number;
  countQuestions: number;
}

const QuizCard: FC<QuizCardProps> = ({
  id,
  name,
  maxMembers,
  countMembers,
  countQuestions,
  endedAt,
}) => {
  const { push } = useRouter();
  const { openModal, setParam } = useModals();
  if (endedAt == 0) {
    return (
      <Menu.Root>
        <Menu.ContextTrigger>
          <Link href={`/create/${id}`} className={styles.card} role="listitem">
            <p className={styles.title}>{name}</p>
            <footer className={styles.footer}>
              <div className="flex gap-2">
                <Badge colorPalette={'blue'} rounded={'sm'}>
                  {maxMembers} мест
                </Badge>
                <Badge colorPalette={'green'} rounded={'sm'}>
                  {countQuestions} вопросов
                </Badge>
              </div>
              <button
                onClick={e => {
                  e.preventDefault();
                  push(`/quizzes/${id}?start=1`);
                }}
                className={styles.start}>
                <FaPlay size={20} />
              </button>
            </footer>
          </Link>
        </Menu.ContextTrigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                onClick={() => push(`/quizzes/${id}?start=1`)}
                value="play">
                <Play size={18} /> Начать
              </Menu.Item>
              <Menu.Item onClick={() => push(`/create/${id}`)} value="edit">
                <Pencil size={18} /> Редактрировать
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setParam({ name: 'delete-quiz', param: String(id) });
                  openModal('delete-quiz');
                }}
                color="fg.error"
                _hover={{ bg: 'bg.error', color: 'fg.error' }}
                value="delete">
                <Trash size={18} /> Удалить
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    );
  }

  return (
    <div className={styles.card} role="listitem">
      <p className={styles.title}>{name}</p>
      <footer className={styles.footer}>
        <div className="flex gap-2">
          <Badge colorPalette={'blue'} rounded={'sm'}>
            {countMembers}/{maxMembers} мест
          </Badge>
          <Badge colorPalette={'green'} rounded={'sm'}>
            {countQuestions} вопросов
          </Badge>
        </div>
        <p className={styles.status}>Закончена (12.12.2020)</p>
      </footer>
    </div>
  );
};

export default QuizCard;
