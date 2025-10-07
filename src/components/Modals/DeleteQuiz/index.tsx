'use client';

import { useModals } from '@/store/modals';
import { Button, Dialog, Portal } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { FC } from 'react';
import styles from './DeleteQuiz.module.scss';
import { useQueryClient } from 'react-query';
import { useDeleteQuiz } from '@/hooks/Quiz';
import { toaster } from '@/components/ui/toaster';

const DeleteQuizModal: FC = () => {
  const { modals, params, toggleModal, closeModal } = useModals();
  const client = useQueryClient();
  const { mutate, isLoading } = useDeleteQuiz(() => {
    client.invalidateQueries(['quizzes']);
    toaster.success({
      title: 'Успешно удалено',
    });
    closeModal('delete-quiz');
  });

  return (
    <Dialog.Root
      placement={'center'}
      open={modals['delete-quiz']}
      closeOnInteractOutside={!isLoading}
      onOpenChange={() => toggleModal('delete-quiz')}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className={styles.header}>
              <h5 className={styles.title}>Удалить викторину</h5>
              <button
                disabled={isLoading}
                className={styles.close}
                onClick={() => closeModal('delete-quiz')}>
                <X size={24} />
              </button>
            </Dialog.Header>
            <Dialog.Body>
              <p>Вы точно уверены, что хотите удалить эту викторину?</p>
              <p>После удаления восстановление будет невозможна</p>
              <footer className="!mt-8 flex justify-between gap-4">
                <Button
                  loading={isLoading}
                  variant={'outline'}
                  colorPalette={'blue'}
                  className="flex-grow">
                  Отмена
                </Button>
                <Button
                  onClick={() => {
                    mutate(Number(params['delete-quiz']));
                  }}
                  loading={isLoading}
                  colorPalette={'blue'}
                  className="flex-grow">
                  Удалить
                </Button>
              </footer>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteQuizModal;
