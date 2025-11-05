import { IQuestion } from '@/types/Question';
import { IAnswer, IAnswers, ITellMyYourself } from '@/types/Socket';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface HoldingQuizStore {
  stage: 'expectation' | 'passing' | 'finish';
  step: number;
  question?: IQuestion;
  countQuestions: number;
  selectedOptions: number;
  answers: IAnswers;
  members: ITellMyYourself[];
  setMembersQuiz: (members: ITellMyYourself[]) => void;
  setCountQuestions: (number: number) => void;
  setOptions: (number: number) => void;
  setQuestion: (question: IQuestion) => void;
  nextStep: () => void;
  setAnswer: (answer: IAnswer) => void;
  setStep: (numbers: number) => void;
  start: () => void;
  finish: () => void;
}

export const useHoldingQuiz = create<HoldingQuizStore>()(
  persist(
    set => ({
      stage: 'expectation',
      question: undefined,
      step: 0,
      countQuestions: 1,
      selectedOptions: 0,
      answers: {},
      members: [],
      setMembersQuiz: members => set(data => ({ ...data, members })),
      setAnswer: answer =>
        set(data => ({
          ...data,
          answers: {
            ...data.answers,
            [answer.userId]: data.answers[answer.userId]
              ? [
                  ...data.answers[answer.userId],
                  { questionId: answer.questionId, answer: answer.answer },
                ]
              : [{ questionId: answer.questionId, answer: answer.answer }],
          },
        })),
      setCountQuestions: number =>
        set(data => ({ ...data, countQuestions: number })),
      setOptions: numbers =>
        set(data => ({ ...data, selectedOptions: numbers })),
      setStep: number => set(data => ({ ...data, step: number })),
      setQuestion: question => set(data => ({ ...data, question })),
      nextStep: () => set(data => ({ ...data, step: data.step + 1 })),
      start: () =>
        set(data => ({
          ...data,
          stage: 'passing',
        })),
      finish: () =>
        set(data => ({
          ...data,
          stage: 'finish',
        })),
    }),
    {
      name: 'holding-quiz',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
