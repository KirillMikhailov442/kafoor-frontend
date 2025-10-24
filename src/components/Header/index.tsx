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
  IconButton,
  Menu,
  Portal,
  SkeletonCircle,
  useMediaQuery,
} from '@chakra-ui/react';
import avatar_img from '@images/kafoor-user.webp';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useProfile } from '@/hooks/User';
import { useCreateQuiz } from '@/hooks/Quiz';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const Header: FC = () => {
  const profile = useProfile(
    () => {},
    () => {
      alert('Ошибка логина');
    },
  );
  const createQuiz = useCreateQuiz(data => {
    push(`/create/${data.data.id}`);
  });

  const { push, replace } = useRouter();
  const [scrolling, setScrolling] = useState(false);
  const [isMobile] = useMediaQuery(['(max-width: 425px)']);
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
          {!isMobile ? (
            <Button
              loading={createQuiz.isLoading}
              onClick={() =>
                createQuiz.mutate({ name: 'Новая викторина', maxMembers: 5 })
              }
              rounded={'full'}
              colorPalette={'blue'}
              variant={'solid'}>
              <Plus />
              Создать викторину
            </Button>
          ) : (
            <IconButton
              size={'lg'}
              colorPalette={'blue'}
              variant={'solid'}
              loading={createQuiz.isLoading}
              onClick={() =>
                createQuiz.mutate({ name: 'Новая викторина', maxMembers: 5 })
              }
              rounded={'full'}>
              <Plus strokeWidth={3} />
            </IconButton>
          )}
          {profile.data?.data?.id ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <div style={{ cursor: 'pointer' }}>
                  <Avatar.Root css={ringCss} colorPalette={'whiteAlpha'}>
                    <Avatar.Fallback name={profile.data.data.name} />
                    <Avatar.Image src={avatar_img.src} />
                    {!profile.data.data.confirmed && (
                      <Float placement="bottom-end" offsetX="1" offsetY="1">
                        <Circle
                          bg="yellow.500"
                          size="8px"
                          outline="0.2px solid"
                          outlineColor="bg"
                        />
                      </Float>
                    )}
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
                    <Menu.Item
                      onClick={() => {
                        Cookies.remove('token');
                        Cookies.remove('refresh-token');
                        replace('/login');
                      }}
                      value="exit">
                      Выйти
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <SkeletonCircle size="10" />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
