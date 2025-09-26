import { FC } from 'react';
import styles from './Questions.module.scss';
import clsx from 'clsx';
import { Trash } from 'lucide-react';

interface SlideProps {
  index: number;
  onClick: () => void;
  onDelete: () => void;
  isActive: boolean;
}

const Slide: FC<SlideProps> = ({ index, isActive, onClick, onDelete }) => {
  return (
    <div onClick={onClick} className={styles.slideWrapper}>
      <div className={clsx(styles.slide, isActive && styles.slideActive)}>
        <h5>{++index}</h5>
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
        className={styles.trash}>
        <Trash size={15} />
      </button>
    </div>
  );
};

export default Slide;
