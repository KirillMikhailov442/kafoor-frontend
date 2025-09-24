'use client';

import { NextPage } from 'next';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { Avatar, Button, defineStyle } from '@chakra-ui/react';
import avatar_img from '@images/kafoor-user.webp';
import EditProfileModal from '@/components/Modals/EditProfile';
import { useModals } from '@/store/modals';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const ProfileScreen: NextPage = () => {
  const { openModal } = useModals();
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
          <p>fake name</p>
        </div>
        <div className={styles.item}>
          <p>Никнейм</p>
          <p>@nickname</p>
        </div>
        <div className={styles.item}>
          <p>Email</p>
          <p>fakemail@gmail.com</p>
        </div>
        <footer className="flex justify-between">
          <Button
            onClick={() => openModal('edit-profile')}
            variant={'subtle'}
            rounded={'full'}
            colorPalette={'blue'}>
            Изменить
          </Button>
          <Button variant={'solid'} rounded={'full'} colorPalette={'blue'}>
            Выйти
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default ProfileScreen;
