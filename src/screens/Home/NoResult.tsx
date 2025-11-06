import { NextPage } from 'next';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { FaRankingStar } from 'react-icons/fa6';

const NoResult: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container, styles.noResult)}>
        <FaRankingStar size={100} />
        <h2 className={styles.title}>У вас нету викторин</h2>
      </div>
    </div>
  );
};

export default NoResult;
