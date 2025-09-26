import { NextPage } from 'next';
import styles from './Create.module.scss';
import Header from './components/Header';
import Questions from './components/Questions';
import OptionQuestion from './components/OptionQuestion';
import EditQuestion from './components/EditQuestion';

const CreateScreen: NextPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Questions />
        <EditQuestion />
        <OptionQuestion />
      </main>
    </div>
  );
};

export default CreateScreen;
