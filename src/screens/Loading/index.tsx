import { NextPage } from 'next';
import styles from './Loading.module.scss';
import { Spinner } from '@chakra-ui/react';

const LoadingScreen: NextPage = () => {
  return (
    <div className={styles.page}>
      <Spinner color={'blue.600'} size={'xl'} />
    </div>
  );
};

export default LoadingScreen;
