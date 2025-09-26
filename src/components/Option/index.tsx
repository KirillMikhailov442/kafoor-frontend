import { FC, useState } from 'react';
import styles from './Option.module.scss';
import clsx from 'clsx';
import { Checkbox, Editable } from '@chakra-ui/react';
import { Trash } from 'lucide-react';

interface OptionProps {
  index: number;
  text: string;
  isTrue?: boolean;
}

const BG_COLOR = ['#01ED5A', '#FF6263', '#FFBC02', '#63B3FF'];
const LETTERS = ['A', 'B', 'C', 'D'];

const Option: FC<OptionProps> = ({ text, index, isTrue }) => {
  const [value, setValue] = useState('');
  console.log(value);

  return (
    <label className={clsx(styles.option)}>
      <div
        style={{
          backgroundColor: BG_COLOR[index - 1],
        }}
        className={styles.letter}>
        {LETTERS[index - 1]}
      </div>
      <Editable.Root
        maxLength={50}
        maxLines={1}
        className={styles.text}
        textAlign="start"
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
        className={styles.checkbox}
        colorPalette={'green'}
        size={'lg'}>
        <Checkbox.HiddenInput checked={isTrue} />
        <Checkbox.Control rounded={'full'}>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label />
      </Checkbox.Root>
      <button className={styles.delete}>
        <Trash size={20} />
      </button>
    </label>
  );
};

export default Option;
