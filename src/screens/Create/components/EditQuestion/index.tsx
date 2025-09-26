'use client';

import { FC } from 'react';
import styles from './EditQuestion.module.scss';
import Image from 'next/image';
import img from '@images/login-bg.jpg';
import Option from '@/components/Option';
import { Editable } from '@chakra-ui/react';
import { useQuiz } from '@/store/quiz';
import { AnimatePresence, motion } from 'framer-motion';

const EditQuestion: FC = () => {
  const { store, index, addOption } = useQuiz();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Editable.Root
            maxLength={150}
            className={styles.text}
            textAlign="center"
            placeholder={'Напишите текст'}
            defaultValue={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
            voluptatem, ut pariatur eum laborum delectus natus illum iste
            obcaecati, doloribus, totam placeat repellat quia amet odit modi at
            labore voluptatibus?`}>
            <Editable.Preview />
            <Editable.Textarea resize={'none'} rows={3} />
          </Editable.Root>
          <div className={styles.file}>
            <Image loading="lazy" alt="img" src={img} />
          </div>
        </div>
        <div className={styles.bottom}>
          {store[index].options?.map((option, i) => (
            <Option key={i} index={++i} text={option.text} />
          ))}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {store[index].options?.length != 4 && (
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
