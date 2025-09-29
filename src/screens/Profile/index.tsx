'use client';

import { NextPage } from 'next';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { Alert, Avatar, Button, defineStyle, Link } from '@chakra-ui/react';
import avatar_img from '@images/kafoor-user.webp';
import EditProfileModal from '@/components/Modals/EditProfile';
import { useModals } from '@/store/modals';
import { useProfile } from '@/hooks/User';
import Loading from './Loading';
import { removeAllCookies } from '@/helpers/cookies';
import { useRouter } from 'next/navigation';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const ProfileScreen: NextPage = () => {
  const { replace } = useRouter();
  const { openModal } = useModals();
  const { data, isLoading } = useProfile();

  if (isLoading) return <Loading />;

  return (
    <div className={styles.page}>
      <EditProfileModal />
      <div className={clsx('k-container', styles.container)}>
        <div className={styles.avatar}>
          <Avatar.Root size={'full'} css={ringCss} colorPalette={'whiteAlpha'}>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src={avatar_img.src} />
          </Avatar.Root>
        </div>
        <div className={styles.item}>
          <p>Имя</p>
          <p>{data?.data.name}</p>
        </div>
        <div className={styles.item}>
          <p>Никнейм</p>
          <p>{data?.data.nickname}</p>
        </div>
        <div className={styles.item}>
          <p>Email</p>
          <p>{data?.data.email}</p>
        </div>
        <footer className="flex justify-between">
          <Button
            onClick={() => openModal('edit-profile')}
            variant={'subtle'}
            rounded={'full'}
            colorPalette={'blue'}>
            Изменить
          </Button>
          <Button
            onClick={() => {
              removeAllCookies();
              replace('/login');
            }}
            variant={'solid'}
            rounded={'full'}
            colorPalette={'blue'}>
            Выйти
          </Button>
        </footer>
        <Alert.Root className="!mt-6" status="warning">
          <Alert.Indicator />
          <Alert.Title>
            Вы не подтвердили свой аккаунт. Подтвердите аккаунт, перейдя по
            ссылке в письме
          </Alert.Title>
          <Link alignSelf="center" fontWeight="medium">
            Отправить письмо
          </Link>
        </Alert.Root>
      </div>
    </div>
  );
};

export default ProfileScreen;
