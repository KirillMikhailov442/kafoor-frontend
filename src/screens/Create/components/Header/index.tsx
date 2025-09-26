'use client';

import { FC } from 'react';
import styles from './Header.module.scss';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Header: FC = () => {
  const { push } = useRouter();
  return (
    <header className={styles.header}>
      <h5>
        Название викторины{' '}
        <span className={styles.saved}>Сохранено: 12.05.2020</span>
      </h5>
      <nav className={styles.actions}>
        <Button
          onClick={() => push('/')}
          variant={'subtle'}
          colorPalette={'blue'}>
          Выйти
        </Button>
        <Button colorPalette={'blue'}>Сохранить</Button>
      </nav>
    </header>
  );
};

export default Header;
