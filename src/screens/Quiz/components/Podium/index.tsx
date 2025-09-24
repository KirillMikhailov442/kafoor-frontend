import { FC } from 'react';
import styles from './Podium.module.scss';
import clsx from 'clsx';

const Podium: FC = () => {
  return (
    <div className={styles.page}>
      <div className={clsx('k-container', styles.container)}>
        <p className={styles.leaders}>Лидеры</p>
        <div className={styles.champions}>
          <div className={clsx(styles.champion, styles.third)}>
            <h4 className={styles.nickname}>Dev</h4>
            <div className={styles.content}>
              <div className={styles.number}>3</div>
            </div>
          </div>
          <div className={clsx(styles.champion, styles.first)}>
            <h4 className={styles.nickname}>Dev</h4>
            <div className={styles.content}>
              <div className={styles.number}>1</div>
            </div>
          </div>
          <div className={clsx(styles.champion, styles.second)}>
            <h4 className={styles.nickname}>Dev</h4>
            <div className={styles.content}>
              <div className={styles.number}>2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
