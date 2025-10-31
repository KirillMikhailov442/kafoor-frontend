import { FC, useState } from 'react';
import styles from './Option.module.scss';
import clsx from 'clsx';
import { RadioGroup } from '@chakra-ui/react';

interface OptionProps {
  number: number;
  text: string;
  correct?: boolean;
  isCorrect?: boolean;
  isFail?: boolean;
  disabledInput?: boolean;
  id: number;
  onDelete?: () => void;
  onCheck?: (value: boolean) => void;
}

const BG_COLOR = ['#01ED5A', '#FF6263', '#FFBC02', '#63B3FF'];
const LETTERS = ['A', 'B', 'C', 'D'];

const Option: FC<OptionProps> = ({
  text,
  number,
  isCorrect = false,
  isFail = false,
  id,
}) => {
  const [value, setValue] = useState(text);

  return (
    <label
      className={clsx(
        styles.option,
        isCorrect && styles.optionCorrect,
        isFail && styles.optionFail,
      )}>
      <div
        style={{
          backgroundColor: BG_COLOR[number - 1],
        }}
        className={styles.letter}>
        {LETTERS[number - 1]}
      </div>
      <p className={styles.text}>{text}</p>
      <RadioGroup.Item key={id} value={String(id)}>
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemIndicator />
      </RadioGroup.Item>
    </label>
  );
};

export default Option;
