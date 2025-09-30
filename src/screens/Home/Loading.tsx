import { NextPage } from 'next';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { Skeleton } from '@chakra-ui/react';

const Loading: NextPage = () => {
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx('k-container', styles.container)}>
        <section className={styles.section}>
          <Skeleton w={300} h={8} className="!mb-6" />
          <div className={styles.grid}>
            <Skeleton h={200} />
            <Skeleton h={200} />
            <Skeleton h={200} />
            <Skeleton h={200} />
            <Skeleton h={200} />
            <Skeleton h={200} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Loading;
