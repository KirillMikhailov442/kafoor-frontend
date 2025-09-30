import clsx from 'clsx';
import styles from './Home.module.scss';
import { NextPage } from 'next';
import QuizCard from '@/components/Cards/Quiz';
import Loading from './Loading';

const HomeScreen: NextPage = () => {
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx('k-container', styles.container)}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ваши викторины</h3>
          <div className={styles.grid}>
            <QuizCard />
            <QuizCard />
            <QuizCard />
          </div>
        </section>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ваши викторины</h3>
          <div className={styles.grid}>
            <QuizCard />
            <QuizCard />
            <QuizCard />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
