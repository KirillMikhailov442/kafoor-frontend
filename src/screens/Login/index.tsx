'use client';

import { NextPage } from 'next';
import styles from './Login.module.scss';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '@/components/UI/Input';
import { useLogin } from '@/hooks/User';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  COOKIE_TOKEN_LIFESPAN,
  COOKIE_TOKEN_REFRESH_LIFESPAN,
} from '@/constants/cookies';
import { toaster } from '@/components/ui/toaster';

const schema = z.object({
  email: z.string().email('Некорректная почта').min(1, 'Введите email'),
  password: z
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
});
type FormData = z.infer<typeof schema>;

const LoginScreen: NextPage = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useLogin(
    data => {
      Cookies.set('token', data.data.accessToken, {
        expires: COOKIE_TOKEN_LIFESPAN,
      });
      Cookies.set('refresh-token', data.data.refreshToken, {
        expires: COOKIE_TOKEN_REFRESH_LIFESPAN,
      });
      setTimeout(() => push('/'), 0.255);
    },
    error => {
      toaster.create({
        title: error.response?.data.message,
        type: 'error',
      });
      setError('email', {
        type: 'required',
        message: 'Неверная почта или пароль',
      });
      setError('password', {
        type: 'required',
        message: 'Неверная почта или пароль',
      });
    },
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Kafoor</h1>
        <form
          onSubmit={handleSubmit(data => {
            mutate(data);
          })}
          className={styles.form}>
          <h4 className="mb-1! text-center">Войти в свой аккаунт</h4>
          <p className=" mb-6! text-[var(--secondary-400)] text-sm! text-center">
            Мы рады видеть вас снова!
          </p>
          <div className="flex flex-col gap-3">
            <Input
              {...register('email')}
              error={errors.email?.message}
              type="email"
              placeholder="Введите email"
              label="Email"
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
              Войти
            </Button>
            <p className={styles.link}>
              Нету аккаунта? <Link href={'/register'}>Нужно создать!</Link>
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

export default LoginScreen;
