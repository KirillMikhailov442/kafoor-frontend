import { NextPage } from 'next';
import styles from './Question.module.scss';
import Header from '../Header';
import clsx from 'clsx';
import { useHoldingQuiz } from '@/store/holdingQuiz';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/User';
import Loading from '../Loading';
import { socket, SOCKET_ACTION } from '@/api/socket';
import { IQuestion } from '@/types/Question';
import { RadioGroup } from '@chakra-ui/react';
import Option from '../Option';
import { IAnswer } from '@/types/Socket';
const Question: NextPage = () => {
  const [selected, setSelected] = useState<number>(0);
  const {
    question,
    setOptions,
    setQuestion,
    nextStep,
    finish,
    setAnswer,
    answers,
  } = useHoldingQuiz();
  const profile = useProfile();
  const [corrects, setCorrects] = useState<number[]>([]);

  useEffect(() => {
    setOptions(selected);
  }, [selected]);

  useEffect(() => {
    socket.on(SOCKET_ACTION.SAY_MY_ANSWER, (data: IAnswer) => {
      setAnswer(data);
    });
  }, []);

  useEffect(() => {
    socket.on(SOCKET_ACTION.TELL_CORRECT_ANSWER, (data: number[]) => {
      setCorrects(data);
    });

    socket.on(SOCKET_ACTION.NEXT_QUESTION, (data: IQuestion) => {
      setCorrects([]);
      setQuestion(data);
      nextStep();
      setOptions(0);
    });

    socket.on(SOCKET_ACTION.FINISH_QUIZ, () => {
      finish();
    });
  }, []);

  if (profile.isLoading) return <Loading />;

  if (localStorage.getItem('quiz')) {
    return (
      <div className="wrapper-bg-blue">
        <Header key={question?.id} />
        <div className="flex flex-grow">
          <div className={clsx('k-container', styles.content)}>
            <div className={styles.top}>
              <h4 className={styles.text}>{question?.text}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper-bg-blue">
      <Header key={question?.id} />
      <div className="flex flex-grow">
        <div className={clsx('k-container', styles.content)}>
          <div className={styles.top}>
            <h4 className={styles.text}>{question?.text}</h4>
          </div>
          <RadioGroup.Root
            className={styles.bottom}
            colorPalette={'gray'}
            size={'lg'}
            variant={'outline'}
            readOnly={corrects.length > 0}
            onValueChange={details => {
              setSelected(Number(details.value));
            }}>
            {question?.options?.map((option, index) => (
              <Option
                id={option.id}
                number={++index}
                key={option.id}
                isCorrect={corrects.includes(selected) && selected == option.id}
                isFail={
                  corrects.length > 0 &&
                  !corrects.includes(option.id) &&
                  selected == option.id
                }
                text={option.text}
              />
            ))}
          </RadioGroup.Root>
        </div>
      </div>
    </div>
  );
};

export default Question;
