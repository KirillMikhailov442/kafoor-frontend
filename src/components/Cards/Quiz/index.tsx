import { FC } from 'react';
import styles from './QuizCard.module.scss';
import { Avatar, Badge, defineStyle } from '@chakra-ui/react';
import avatar_img from '@images/kafoor-user.webp';
import { UsersRound } from 'lucide-react';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const QuizCard: FC = () => {
  return (
    <div className={styles.card} role="listitem">
      <header className={styles.header}>
        <Avatar.Root css={ringCss} colorPalette={'black'}>
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src={avatar_img.src} />
        </Avatar.Root>
        <div>
          <h5 className={styles.name}>Fake</h5>
          <p className={styles.nickname}>@nickname</p>
        </div>
      </header>
      <p className={styles.title}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod
        officiis deleniti sit suscipit assumenda consectetur mollitia rem eius
      </p>
      <footer className={styles.footer}>
        <div className="flex gap-2">
          <Badge colorPalette={'blue'} rounded={'sm'}>
            12/12 мест
          </Badge>
          <Badge colorPalette={'green'} rounded={'sm'}>
            12 задач
          </Badge>
        </div>
        <p className={styles.status}>Закончена (12.12.2020)</p>
      </footer>
    </div>
  );
};

export default QuizCard;
