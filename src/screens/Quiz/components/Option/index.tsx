import { FC } from 'react';
import styles from './Option.module.scss';
import clsx from 'clsx';

interface OptionProps {
  index: number;
  text: string;
}

const BG_COLOR = ['#01ED5A', '#FF6263', '#FFBC02', '#63B3FF'];
const LETTERS = ['A', 'B', 'C', 'D'];

const Option: FC<OptionProps> = ({ text, index }) => {
  return (
    <button className={clsx(styles.option)}>
      <div
        style={{
          backgroundColor: BG_COLOR[index - 1],
        }}
        className={styles.letter}>
        {LETTERS[index - 1]}
      </div>
      <h5 className={styles.text}>{text}</h5>
    </button>
  );
};

export default Option;
