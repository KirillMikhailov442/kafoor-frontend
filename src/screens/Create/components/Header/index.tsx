'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import {
  Button,
  Editable,
  InputGroup,
  NumberInput,
  Spinner,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, CircleAlert, Users } from 'lucide-react';
import { useQuiz } from '@/store/quiz';
import { useDebounce } from 'use-debounce';
import { useUpdateQuiz } from '@/hooks/Quiz';
import { parseDate } from '@/helpers/date';
import questionService from '@api/services/Question'
import optionService from '@api/services/Option'

const Header: FC = () => {
  const { push } = useRouter();
  const quizId = useParams<{ id: string }>().id;
  const {
    name,
    maxMembers,
    store,
    lastChanged,
    editQuizName,
    editQuizMaxMembers,
  } = useQuiz();
  const updateQuiz = useUpdateQuiz();
  const [updatedName] = useDebounce(name, 2000);
  const [updatedMaxMembers] = useDebounce(maxMembers, 2000);
  const [updatedId, setUpdatedId] = useState<Set<string>>(new Set([]));
  const [updatedIdD] = useDebounce(updatedId, 2000);

  useEffect(() => {
    if (name) {
      updateQuiz.mutate({
        id: Number(quizId),
        name,
        maxMembers,
      });
    }
  }, [updatedName, updatedMaxMembers]);

  useEffect(() => {
    setUpdatedId(prev => new Set([...prev, lastChanged]));
  }, [store]);

  useEffect(() => {
    updatedIdD.forEach((item) => {
      const [type, slug] = item.split('@');
      
      if(type == 'question'){
        const question = store.find(el => el.slug == slug);
        if(question) return questionService.edit({...question, slug: item, quizId: Number(quizId)})
          questionService.remove(item)

      }
      else{
               const question = store.find(el1 => el1.options?.some(el2 => el2.slug == slug));
               if(!question) return;
               const option = question.options?.find(el1 => el1.slug == slug)

               if(option) return optionService.edit({...option, questionSlug: question.slug, slug: item})
      }
        // const option = store.find(el1 => el1.options?.some(el2 => el2.slug == slug));
        // if(option) return optionService.edit({...option, slug: item, questionId: })
      //   if(!question?.options) return;      
      //   const option = question?.options.find(el1 => el1.id == id);

      //   if(!option) return optionService.remove(id)
      //     optionService.edit({...option, questionId: question.id})
      // }
    })
    updatedId.clear();
  }, [updatedIdD]);

  return (
    <header className={styles.header}>
      <div className="flex items-center">
        {updateQuiz.isSuccess && (
          <div className={styles.status}>
            <CheckCircle2 color="#28a745" size={35} />
          </div>
        )}
        {updateQuiz.isError && (
          <div className={styles.status}>
            <CircleAlert color="#ff4423" size={35} />
          </div>
        )}
        {updateQuiz.isLoading && (
          <div className={styles.status}>
            <Spinner color={'gray'} size={'lg'} />
          </div>
        )}
        <div className="relative">
          <Editable.Root
            width={250}
            maxLength={32}
            maxLines={1}
            className={styles.name}
            textAlign="start"
            value={name}
            placeholder={'Название викторины...'}
            onValueChange={details => editQuizName(details.value)}
            defaultValue={name}>
            <Editable.Preview
              color={name ? 'black' : 'gray.400'}
              fontStyle={name ? 'normal' : 'italic'}
            />
            <Editable.Input />
          </Editable.Root>
          {updateQuiz.isSuccess && (
            <p className={styles.lastUpdated}>
              Обновлено{' '}
              {parseDate(
                updateQuiz.data?.data.updatedAt,
                'YYYY MM DD HH:MM:ss',
              )}
            </p>
          )}
        </div>
      </div>

      <nav className={styles.actions}>
        <NumberInput.Root
          defaultValue={String(maxMembers)}
          onValueChange={details => editQuizMaxMembers(Number(details.value))}
          min={2}
          max={10}
          width="100px">
          <NumberInput.Control />
          <InputGroup
            startElementProps={{ pointerEvents: 'auto' }}
            startElement={
              <NumberInput.Scrubber>
                <Users size={20} />
              </NumberInput.Scrubber>
            }>
            <NumberInput.Input />
          </InputGroup>
        </NumberInput.Root>
        <Button
          onClick={() => push('/')}
          variant={'subtle'}
          colorPalette={'blue'}>
          Выйти
        </Button>
        <Button
          loading={updateQuiz.isLoading}
          onClick={() => {
            updateQuiz.mutate({
              id: Number(quizId),
              name,
              maxMembers,
            });
          }}
          colorPalette={'blue'}>
          Сохранить
        </Button>
      </nav>
    </header>
  );
};

export default Header;
