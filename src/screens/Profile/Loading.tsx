import { Skeleton, SkeletonCircle } from '@chakra-ui/react';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { NextPage } from 'next';

const Loading: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container)}>
        <div className={styles.avatar}>
          <SkeletonCircle width={200} height={200} />
        </div>
        <Skeleton height="7" width={'100%'} />
        <Skeleton height="7" width={'100%'} />
        <Skeleton height="7" width={'100%'} />
        <footer className="flex justify-between !mt-4">
          <Skeleton height="7" width={100} />
          <Skeleton height="7" width={100} />
        </footer>
      </div>
    </div>
  );
};

export default Loading;
