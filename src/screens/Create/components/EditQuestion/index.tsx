'use client';

import { FC, useState } from 'react';
import styles from './EditQuestion.module.scss';
import Option from '@/components/Option';
import { Editable } from '@chakra-ui/react';
import { useQuiz } from '@/store/quiz';
import { AnimatePresence, motion } from 'framer-motion';

const EditQuestion: FC = () => {
  const { store, index, addOption, removeOption, editQuestionText } = useQuiz();

  const [text, setText] = useState(store[index]?.text);
  if (store.length <= 0) return <div className={styles.wrapper}></div>;

  return (
    <div key={store[index].slug} className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Editable.Root
            maxLength={150}
            className={styles.text}
            textAlign="center"
            placeholder={'Напишите текст'}
            onValueChange={details => {
              editQuestionText(index, details.value);
              setText(details.value);
            }}
            defaultValue={store[index]?.text}>
            <Editable.Preview
              color={text ? 'white' : 'gray.200'}
              fontStyle={text ? 'normal' : 'italic'}
            />
            <Editable.Textarea resize={'none'} rows={3} />
          </Editable.Root>
        </div>
        <div className={styles.bottom}>
          {store?.length > 0 &&
            store[index]?.options?.map((option, i) => (
              <Option
                disabledInput={false}
                key={option.slug}
                number={i + 1}
                correct={option.correct}
                text={option.text}
                onDelete={() => removeOption(index, i)}
              />
            ))}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {store[index]?.options?.length != 4 && (
          <motion.button
            initial={{ bottom: -100 }}
            animate={{ bottom: 0 }}
            exit={{ bottom: -100 }}
            key={'add-option'}
            onClick={() => addOption(index)}
            className={styles.addOption}>
            + Вопрос
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditQuestion;
