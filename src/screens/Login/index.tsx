import { NextPage } from 'next';
import styles from './Login.module.scss';
import Input from '@/components/UI/Input';
import InputPassword from '@/components/UI/InputPassword';
import Image from 'next/image';
import bg_img from '@images/login-bg.jpg';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const LoginScreen: NextPage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Kafoor</h1>
        <div className="flex">
          <form className={styles.form}>
            <h4 className="mb-1!">Войти в свой аккаунт</h4>
            <p className=" mb-6! text-[var(--gray)] text-sm!">
              Мы рады видеть вас снова!
            </p>
            <div className="flex flex-col gap-3">
              <Input size="lg" label="Email" placeholder="Введите почту" />
              <InputPassword
                size={'lg'}
                label="Пароль"
                placeholder="Введите пароль"
              />
              <Button size={'lg'} bg={'var(--blue)'}>
                Войти
              </Button>
              <p className={styles.link}>
                Нету аккаунта? <Link href={'/register'}>Нужно создать!</Link>
              </p>
            </div>
          </form>
        </div>
        <p className={styles.footer}>
          Создавайте и участвуйте в онлайн викторинах прямо сейчас!
        </p>
      </main>
      <div className={styles.img}>
        {/* <Image
        className={styles.img}
        alt="bg-img"
        width={0}
        height={0}
        layout="responsive"
        src={bg_img.src}
      /> */}
      </div>
    </div>
  );
};

export default LoginScreen;
