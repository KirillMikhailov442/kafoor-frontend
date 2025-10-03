'use client';

import { NextPage } from 'next';
import styles from './Start.module.scss';
import clsx from 'clsx';
import { Users } from 'lucide-react';
import { Avatar, Button, defineStyle } from '@chakra-ui/react/';
import { useParams, useRouter } from 'next/navigation';
import { useProfileWithoutEnabled } from '@/hooks/User';
import { useEffect, useState } from 'react';
import { socket } from '@/api/socket';
import Loading from '../Loading';
import { ITellMyYourself } from '@/types/Socket';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const Start: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;
  const { push } = useRouter();
  const [members, setMembers] = useState<ITellMyYourself[]>([]);
  const profile = useProfileWithoutEnabled(data => {
    socket.emit('JOIN_TO_QUIZ', {
      quizId,
      userId: data.data.id,
      name: data.data.name,
      nickname: data.data.nickname,
    });
  });

  useEffect(() => {
    socket.on('TELL_ME_YOURSELF', (data: ITellMyYourself) => {
      setMembers(prev => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    profile.refetch();
  }, []);

  if (profile.isLoading || !profile.isSuccess) return <Loading />;
  return (
    <div className="wrapper-bg-blue">
      <header className={styles.header}>
        <div className={clsx('k-container', styles.headerContainer)}>
          <h5 className={styles.name}>Название игры</h5>
          <p className={styles.step}>
            <Users size={20} /> {members.length}/12
          </p>
        </div>
      </header>
      <div className="flex flex-grow">
        <div className={styles.content}>
          <div className={styles.members}>
            <div className={styles.membersContainer}>
              {members.map(member => (
                <div
                  key={member.socketId}
                  className="flex flex-col items-center">
                  <Avatar.Root
                    size={'2xl'}
                    css={ringCss}
                    colorPalette={'whiteAlpha'}>
                    <Avatar.Fallback name={member.name} />
                    {/* <Avatar.Image src={avatar_img.src} /> */}
                  </Avatar.Root>
                  <p>{member.name}</p>
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
              onClick={() => {
                socket.emit('LEAVE_FROM_QUIZ', socket.id);
                push('/');
              }}
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
