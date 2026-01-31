import { FC, useEffect, useState } from 'react';
import styles from './Option.module.scss';
import clsx from 'clsx';
import { Checkbox, Editable } from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import { useQuiz } from '@/store/quiz';

interface OptionProps {
  number: number;
  text: string;
  correct?: boolean;
  readOnly?: boolean;
  isCorrect?: boolean;
  isFail?: boolean;
  disabledInput?: boolean;
  onDelete?: () => void;
  onCheck?: (value: boolean) => void;
}

const BG_COLOR = ['#01ED5A', '#FF6263', '#FFBC02', '#63B3FF'];
const LETTERS = ['A', 'B', 'C', 'D'];

const Option: FC<OptionProps> = ({
  text,
  number,
  correct,
  readOnly = false,
  onCheck,
  isCorrect = false,
  isFail = false,
  disabledInput = true,
  onDelete,
}) => {
  const [value, setValue] = useState(text);
  const [checked, setChecked] = useState<boolean>(Boolean(correct));
  const { editOption, index } = useQuiz();

  useEffect(() => {
    // @ts-ignore
    editOption(index, number - 1, { correct: checked, text: value });
  }, [value, checked]);

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
      <Editable.Root
        readOnly={readOnly}
        maxLength={50}
        maxLines={1}
        className={styles.text}
        textAlign="start"
        disabled={disabledInput}
        value={value}
        placeholder={'Вариант ответа...'}
        onValueChange={details => setValue(details.value)}
        defaultValue={text}>
        <Editable.Preview
          color={value ? 'black' : 'gray.400'}
          fontStyle={value ? 'normal' : 'italic'}
        />
        <Editable.Input />
      </Editable.Root>
      <Checkbox.Root
        readOnly={readOnly}
        className={styles.checkbox}
        colorPalette={'green'}
        checked={checked}
        size={'lg'}>
        <Checkbox.HiddenInput
          onChange={e => {
            setChecked(e.target.checked);
            if (onCheck) onCheck(e.target.checked);
          }}
        />
        <Checkbox.Control rounded={'full'}>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label />
      </Checkbox.Root>
      {onDelete && (
        <button onClick={onDelete} className={styles.delete}>
          <Trash size={20} />
        </button>
      )}
    </label>
  );
};

export default Option;
