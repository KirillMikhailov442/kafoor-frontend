'use client';

import { useModals } from '@/store/modals';
import { Button, Dialog, Portal } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { FC } from 'react';
import styles from './EditProfile.module.scss';
import Input from '@/components/UI/Input';

const EditProfileModal: FC = () => {
  const { modals, toggleModal, closeModal } = useModals();
  return (
    <Dialog.Root
      placement={'center'}
      open={modals['edit-profile']}
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
              <form className={styles.form}>
                <Input label="Имя" placeholder="Введите имя" />
                <Input type="email" label="Email" placeholder="Введите почту" />
                <Input label="Никнейм" placeholder="Введите никнейм" />
                <footer className="flex justify-between mt-5!">
                  <Button variant={'subtle'} colorPalette={'blue'}>
                    Отменить
                  </Button>
                  <Button variant={'solid'} colorPalette={'blue'}>
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
