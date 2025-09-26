import { FC } from 'react';
import styles from './Header.module.scss';
import { Button } from '@chakra-ui/react';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h5>
        Название викторины{' '}
        <span className={styles.saved}>Сохранено: 12.05.2020</span>
      </h5>
      <nav className={styles.actions}>
        <Button variant={'subtle'} colorPalette={'blue'}>
          Выйти
        </Button>
        <Button colorPalette={'blue'}>Сохранить</Button>
      </nav>
    </header>
  );
};

export default Header;
