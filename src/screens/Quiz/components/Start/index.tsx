'use client';

import { NextPage } from 'next';
import styles from './Start.module.scss';
import clsx from 'clsx';
import { Check, Link, Users } from 'lucide-react';
import { Avatar, Button, defineStyle, useClipboard } from '@chakra-ui/react/';
import { useParams, useRouter } from 'next/navigation';
import { useProfileWithoutEnabled } from '@/hooks/User';
import { useEffect, useRef, useState } from 'react';
import { socket, SOCKET_ACTION } from '@/api/socket';
import Loading from '../Loading';
import { ITellMyYourself } from '@/types/Socket';
import { IUser } from '@/types/User';
import { useGetQuizWithoutEnabled, useStartQuiz } from '@/hooks/Quiz';
import { toaster } from '@/components/ui/toaster';
import avatar_img from '@images/kafoor-user.webp';

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
});

const Start: NextPage = () => {
  const quizId = Number(useParams<{ id: string }>().id);
  const { push } = useRouter();
  const me = useRef<IUser>(null);
  const [members, setMembers] = useState<ITellMyYourself[]>([]);
  const clipboard = useClipboard({ value: window.location.href });
  const quiz = useGetQuizWithoutEnabled(
    quizId,
    () => {},
    () => {
      push('/');
    },
  );
  const profile = useProfileWithoutEnabled(data => {
    me.current = { ...data.data, quizId };
    socket.emit(SOCKET_ACTION.JOIN_TO_QUIZ, {
      quizId,
      userId: data.data.id,
      name: data.data.name,
      nickname: data.data.nickname,
    });
  });
  const startQuiz = useStartQuiz(() => {});

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

    socket.on(SOCKET_ACTION.LEAVE_FROM_QUIZ, (socketId: string) => {
      setMembers(prev => prev.filter(member => member.socketId != socketId));
    });

    socket.on('disconnect', () => {
      socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, {
        quizId,
        socketId: socket.id,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, {
        quizId,
        socketId: socket.id,
      });
    });

    window.addEventListener('pagehide', () => {
      socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, {
        quizId,
        socketId: socket.id,
      });
    });
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
            <Users size={20} /> {members.length}/{quiz.data?.data.maxMembers}
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
                    <Avatar.Image src={avatar_img.src} />
                  </Avatar.Root>
                  <p>{member.name}</p>
                </div>
              ))}
            </div>
          </div>
          <footer className={styles.footer}>
            {quiz.data?.data.userId == profile.data.data.id && (
              <Button
                onClick={() => {
                  toaster.success({
                    title: 'Ссылка скопирована',
                  });
                  clipboard.copy();
                }}
                color={'white'}
                disabled={startQuiz.isLoading}
                className={styles.copyLink}
                variant={'plain'}>
                Пригласить
                {clipboard.copied ? <Check size={16} /> : <Link size={16} />}
              </Button>
            )}
            {quiz.data?.data.userId == profile.data.data.id && (
              <Button
                onClick={() =>
                  startQuiz.mutate({
                    quizId,
                    users: members.map(member => member.userId),
                  })
                }
                loading={startQuiz.isLoading}
                className={styles.join}
                size={'lg'}
                colorPalette={'yellow'}
                rounded={'full'}
                variant={'solid'}>
                Начать викторину
              </Button>
            )}
            <Button
              onClick={() => {
                socket.emit(SOCKET_ACTION.LEAVE_FROM_QUIZ, {
                  quizId,
                  socketId: socket.id,
                });
                push('/');
              }}
              disabled={startQuiz.isLoading}
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
