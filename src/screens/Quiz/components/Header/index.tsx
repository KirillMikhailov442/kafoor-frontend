'use client';

import { FC, useState, useEffect } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react';

const Header: FC = () => {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolling(window.scrollY >= 50 ? true : false);
    });
  }, []);
  return (
    <header className={styles.header}>
      <div className={clsx('k-container', styles.container)}>
        <ProgressCircle.Root value={15}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track stroke={'transparent'} />
            <ProgressCircle.Range stroke={'white'} />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <p className={styles.progressNum}>12</p>
          </AbsoluteCenter>
        </ProgressCircle.Root>
        <p className={styles.step}>4/12</p>
      </div>
    </header>
  );
};

export default Header;
