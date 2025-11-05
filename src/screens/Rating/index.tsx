'use client';

import { NextPage } from 'next';
import styles from './Rating.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';

const RatingScreen: NextPage = () => {
  const { push } = useRouter();
  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container)}>
        <p className={styles.leaders}>Рейтинг</p>
        <ul className={styles.rating}>
          {/* {rating.map((item, index) => (
            <>
              <li
                key={item.id}
                className={clsx(
                  styles.ratingItem,
                  index + 1 == 1 && styles.first,
                  index + 1 == 2 && styles.second,
                  index + 1 == 3 && styles.third,
                )}>
                <div className="flex gap-3 items-center">
                  <h5 className={styles.number}>{++index}</h5>
                  <p>{item.nickname}</p>
                </div>
                <p className="!font-semibold">{item.scores}</p>
              </li>
            </>
          ))} */}
        </ul>
        <Button
          onClick={() => {
            push('/');
          }}
          variant={'plain'}
          color={'white'}
          className={styles.exit}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default RatingScreen;
