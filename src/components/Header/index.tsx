'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Circle,
  defineStyle,
  Float,
  Menu,
  Portal,
} from '@chakra-ui/react';
import avatar_img from '@images/kafoor-user.webp';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const Header: FC = () => {
  const { push } = useRouter();
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolling(window.scrollY >= 50 ? true : false);
    });
  }, []);

  return (
    <header className={clsx(styles.header, scrolling && styles.scrolling)}>
      <div className={clsx('k-container', styles.container)}>
        <Link
          className={clsx(styles.logo, scrolling && styles.logoScrolling)}
          href={'/'}>
          Kafoor
        </Link>
        <nav className={styles.nav}>
          <Button
            onClick={() => push('/create')}
            rounded={'full'}
            colorPalette={'blue'}
            variant={'solid'}>
            <Plus />
            Создать викторину
          </Button>
          <Menu.Root>
            <Menu.Trigger asChild>
              <div style={{ cursor: 'pointer' }}>
                <Avatar.Root css={ringCss} colorPalette={'whiteAlpha'}>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src={avatar_img.src} />
                  <Float placement="bottom-end" offsetX="1" offsetY="1">
                    <Circle
                      bg="yellow.500"
                      size="8px"
                      outline="0.2px solid"
                      outlineColor="bg"
                    />
                  </Float>
                </Avatar.Root>
              </div>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="profile">
                    <Link className="w-full" href={'/profile'}>
                      Профиль
                    </Link>
                  </Menu.Item>
                  <Menu.Item value="exit">Выйти</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </nav>
      </div>
    </header>
  );
};

export default Header;
