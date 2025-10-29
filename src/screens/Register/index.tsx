'use client';

import { NextPage } from 'next';
import styles from './Register.module.scss';
import { Button, Tabs } from '@chakra-ui/react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '@/components/UI/Input';
import { useRegister } from '@/hooks/User';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toaster } from '@/components/ui/toaster';
import Cookies from 'js-cookie';
import {
  COOKIE_TOKEN_LIFESPAN,
  COOKIE_TOKEN_REFRESH_LIFESPAN,
} from '@/constants/cookies';

const schema = z.object({
  role: z.enum(['STUDENT', 'TEACHER']),
  name: z.string().nonempty('Введите имя'),
  nickname: z
    .string()
    .nonempty('Введите никнейм')
    .regex(/^[a-zA-Z0-9]{3,16}$/, {
      message:
        'Никнейм должен содержать от 3 до 16 символов, только латинские буквы и цифры',
    }),
  email: z.string().email('Некорректная почта').min(1, 'Введите email'),
  password: z
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    // .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .regex(
      /[^A-Za-z0-9]/,
      'Пароль должен содержать хотя бы один специальный символ',
    ),
});
type FormData = z.infer<typeof schema>;

const RegisterScreen: NextPage = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'STUDENT',
    },
  });

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
  }, []);

  const { mutate, isLoading } = useRegister(
    data => {
      Cookies.set('token', data.data.accessToken, {
        expires: COOKIE_TOKEN_LIFESPAN,
      });
      Cookies.set('refresh-token', data.data.refreshToken, {
        expires: COOKIE_TOKEN_REFRESH_LIFESPAN,
      });
      setTimeout(() => push('/'), 255);
    },
    error => {
      toaster.create({
        title: error.response?.data.message,
        type: 'error',
      });
    },
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Kafoor</h1>
        <form
          onSubmit={handleSubmit(data => {
            mutate({ ...data, nickname: `@${data.nickname}` });
          })}
          className={styles.form}>
          <h4 className="mb-1! text-center">Создать новый аккаунт</h4>
          <p className=" mb-3! text-[var(--secondary-400)] text-sm! text-center">
            Мы рады приветствовать нового участника!
          </p>
          <div className="flex flex-col gap-3">
            <Tabs.Root
              fitted
              size={'sm'}
              defaultValue={watch('role')}
              variant={'enclosed'}>
              <p className={'text-sm!'}>Тип аккаунта</p>
              <Tabs.List w={'full'}>
                <Tabs.Trigger
                  onClick={() => setValue('role', 'STUDENT')}
                  value="STUDENT">
                  Ученик
                </Tabs.Trigger>
                <Tabs.Trigger
                  onClick={() => setValue('role', 'TEACHER')}
                  value="TEACHER">
                  Учитель
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
            <Input
              {...register('name')}
              error={errors.name?.message}
              placeholder="Введите имя"
              label="Имя"
            />
            <Input
              {...register('email')}
              error={errors.email?.message}
              type="email"
              placeholder="Введите email"
              label="Email"
            />
            <Input
              {...register('nickname')}
              error={errors.nickname?.message}
              placeholder="Введите никнейм"
              label="Никнейм"
            />
            <Input
              {...register('password')}
              error={errors.password?.message}
              type="password"
              placeholder="Введите пароль"
              label="Пароль"
            />
            <Button
              disabled={Object.keys(errors).length > 0 || isLoading}
              loading={isLoading}
              type="submit"
              size={'lg'}
              bg={'var(--primary-500)'}>
              Зарегистрироваться
            </Button>
            <p className={styles.link}>
              Уже есть аккаунт? <Link href={'/login'}>Нужно войти!</Link>
            </p>
          </div>
        </form>
        <p className={styles.footer}>
          Создавайте и участвуйте в онлайн викторинах прямо сейчас!
        </p>
      </main>
      <div className={styles.img}></div>
    </div>
  );
};

export default RegisterScreen;
