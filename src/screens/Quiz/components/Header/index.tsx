'use client';

import { FC } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={clsx('k-container', styles.container)}>
        <ProgressCircle.Root value={50}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track stroke={'transparent'} />
            <ProgressCircle.Range stroke={'whiteAlpha.500'} />
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
