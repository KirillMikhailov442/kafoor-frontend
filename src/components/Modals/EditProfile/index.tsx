'use client';

import { useModals } from '@/store/modals';
import { Button, Dialog, Portal } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import styles from './EditProfile.module.scss';
import Input from '@/components/UI/Input';
import { useProfile, useProfileUpdate } from '@/hooks/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { toaster } from '@/components/ui/toaster';
import { useQueryClient } from 'react-query';

const EditProfileModal: FC = () => {
  const { modals, toggleModal, closeModal } = useModals();
  const formRef = useRef<HTMLFormElement>(null);
  const client = useQueryClient();
  const profile = useProfile();
  const update = useProfileUpdate(
    () => {
      toaster.create({
        title: 'Профиль успешно изменен',
        type: 'success',
      });
      client.invalidateQueries(['profile']);
      closeModal('edit-profile');
    },
    error => {
      toaster.create({
        title: error.response?.data.message,
        type: 'error',
      });
    },
  );

  const schema = z.object({
    email: z.string().email('Некорректная почта').min(1, 'Введите email'),
    name: z.string().nonempty('Введите имя'),
    nickname: z.string().nonempty('Введите никнейм'),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: profile.data?.data.email,
      name: profile.data?.data.name,
      nickname: profile.data?.data.nickname,
    },
  });

  useEffect(() => {
    setTimeout(() => formRef.current?.querySelector('input')?.focus(), 1);
  }, [profile.isLoading, modals['edit-profile']]);

  if (profile.isLoading) return;
  return (
    <Dialog.Root
      placement={'center'}
      open={modals['edit-profile']}
      closeOnInteractOutside={!update.isLoading}
      onOpenChange={() => toggleModal('edit-profile')}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className={styles.header}>
              <h5 className={styles.title}>Изменить профиль</h5>
              <button
                className={styles.close}
                onClick={() => closeModal('edit-profile')}>
                <X size={24} />
              </button>
            </Dialog.Header>
            <Dialog.Body>
              <form
                ref={formRef}
                onSubmit={handleSubmit(data => update.mutate(data))}
                className={styles.form}>
                <Input
                  {...register('name')}
                  error={errors.name?.message}
                  label="Имя"
                  placeholder="Введите имя"
                />
                <Input
                  {...register('email')}
                  error={errors.email?.message}
                  type="email"
                  label="Email"
                  placeholder="Введите почту"
                />
                <Input
                  {...register('nickname')}
                  error={errors.nickname?.message}
                  label="Никнейм"
                  placeholder="Введите никнейм"
                />
                <footer className="flex justify-between mt-5!">
                  <Button
                    type="button"
                    onClick={() => reset()}
                    disabled={update.isLoading}
                    loading={update.isLoading}
                    variant={'subtle'}
                    colorPalette={'blue'}>
                    Отменить
                  </Button>
                  <Button
                    type="submit"
                    disabled={update.isLoading}
                    loading={update.isLoading}
                    variant={'solid'}
                    colorPalette={'blue'}>
                    Изменить
                  </Button>
                </footer>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EditProfileModal;
