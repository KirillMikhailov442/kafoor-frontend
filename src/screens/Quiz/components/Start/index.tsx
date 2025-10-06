'use client';

import { NextPage } from 'next';
import styles from './Start.module.scss';
import clsx from 'clsx';
import { Users } from 'lucide-react';
import { Avatar, Button, defineStyle } from '@chakra-ui/react/';
import { useParams, useRouter } from 'next/navigation';
import { useProfileWithoutEnabled } from '@/hooks/User';
import { useEffect, useRef, useState } from 'react';
import { socket, SOCKET_ACTION } from '@/api/socket';
import Loading from '../Loading';
import { ITellMyYourself } from '@/types/Socket';
import { IUser } from '@/types/User';
import { useGetQuizWithoutEnabled } from '@/hooks/Quiz';
import { toaster } from '@/components/ui/toaster';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const Start: NextPage = () => {
  const quizId = useParams<{ id: string }>().id;
  const { push } = useRouter();
  const me = useRef<IUser>(null);
  const [members, setMembers] = useState<ITellMyYourself[]>([]);
  const quiz = useGetQuizWithoutEnabled(
    Number(quizId),
    () => {},
    () => {
      toaster.warning({
        title: 'не удалось подключится к викторине',
      });
      setTimeout(() => {
        push('/');
      }, 1000);
    },
  );
  const profile = useProfileWithoutEnabled(data => {
    // @ts-ignore
    me.current = { ...data.data, quizId };
    socket.emit(SOCKET_ACTION.JOIN_TO_QUIZ, {
      quizId,
      userId: data.data.id,
      name: data.data.name,
      nickname: data.data.nickname,
    });
  });

  useEffect(() => {
    socket.on(SOCKET_ACTION.JOIN_TO_QUIZ, (data: ITellMyYourself) => {
      const hasUser = members.some(member => member.userId == data.userId);
      if (!hasUser) setMembers(prev => [...prev, data]);
      if (data.userId != me.current?.id)
        socket.emit(SOCKET_ACTION.TELL_ABOUT_YOURSELF, {
          ...me.current,
          userId: me.current?.id,
          quizId,
        });
    });

    socket.on(SOCKET_ACTION.TELL_ABOUT_YOURSELF, (data: ITellMyYourself) => {
      if (data.userId == me.current?.id) return;
      const hasUser = members.some(member => member.userId == data.userId);
      if (!hasUser) setMembers(prev => [...prev, data]);
    });

    // socket.on(SOCKET_ACTION.LEAVE_FROM_QUIZ, (data: ILeaveFromQuiz) => {
    //   setMembers(prev =>
    //     prev.filter(member => member.socketId != data.socketId),
    //   );
    // });
  }, []);

  useEffect(() => {
    quiz.refetch();
    profile.refetch();
  }, []);

  if (profile.isLoading || !profile.isSuccess || quiz.isLoading)
    return <Loading />;
  return (
    <div className="wrapper-bg-blue">
      <header className={styles.header}>
        <div className={clsx('k-container', styles.headerContainer)}>
          <h5 className={styles.name}>{quiz.data?.data.name}</h5>
          <p className={styles.step}>
            <Users size={20} /> {members.length}/{quiz.data?.data.maxMember}
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
              colorPalette={'yellow'}
              rounded={'full'}
              variant={'solid'}>
              Начать викторину
            </Button>
            <Button
              onClick={() => {
                socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, socket.id);
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
