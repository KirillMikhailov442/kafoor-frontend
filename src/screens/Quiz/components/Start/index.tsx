'use client';

import { NextPage } from 'next';
import styles from './Start.module.scss';
import clsx from 'clsx';
import { Users } from 'lucide-react';
import { Avatar, Button, defineStyle } from '@chakra-ui/react/';
import avatar_img from '@images/kafoor-user.webp';
import { useRouter } from 'next/navigation';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const Start: NextPage = () => {
  const { push } = useRouter();
  return (
    <div className="wrapper-bg-blue">
      <header className={styles.header}>
        <div className={clsx('k-container', styles.headerContainer)}>
          <h5 className={styles.name}>Название игры</h5>
          <p className={styles.step}>
            <Users size={20} /> 4/12
          </p>
        </div>
      </header>
      <div className="flex flex-grow">
        <div className={styles.content}>
          <div className={styles.members}>
            <div className={styles.membersContainer}>
              {[1, 2, 3, 4, 5, 6, 7].map((d, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Avatar.Root
                    size={'2xl'}
                    css={ringCss}
                    colorPalette={'whiteAlpha'}>
                    <Avatar.Fallback name={'fake'} />
                    <Avatar.Image src={avatar_img.src} />
                  </Avatar.Root>
                  <p>Name</p>
                </div>
              ))}
            </div>
          </div>
          <footer className={styles.footer}>
            <Button
              className={styles.join}
              size={'lg'}
              colorPalette={'blue'}
              rounded={'full'}
              variant={'solid'}>
              Присоединится
            </Button>
            <Button
              onClick={() => push('/')}
              color={'white'}
              className={styles.exit}
              variant={'plain'}>
              Выйти
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Start;
