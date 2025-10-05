'use client';

import { NextPage } from 'next';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { FaRankingStar } from 'react-icons/fa6';
import { Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateQuiz } from '@/hooks/Quiz';

const NoResult: NextPage = () => {
  const { push } = useRouter();
  const createQuiz = useCreateQuiz(data => {
    push(`/create/${data.data.id}`);
  });
  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container, styles.noResult)}>
        <FaRankingStar size={100} />
        <div>
          <h2 className={styles.title}>У вас нету викторин</h2>
          <p className="!mt-2 text-center">
            Самое время создать новую викторину!
          </p>
        </div>
        <Button
          loading={createQuiz.isLoading}
          onClick={() =>
            createQuiz.mutate({ name: 'Новая викторина', maxMember: 5 })
          }
          rounded={'full'}
          colorPalette={'blue'}
          variant={'surface'}>
          <Plus />
          Создать викторину
        </Button>
      </div>
    </div>
  );
};

export default NoResult;
