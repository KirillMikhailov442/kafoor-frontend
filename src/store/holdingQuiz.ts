import { IQuestion } from '@/types/Question';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface HoldingQuizStore {
  stage: 'expectation' | 'passing' | 'finish';
  step: number;
  question?: IQuestion;
  countQuestions: number;
  selectedOptions: number;
  setCountQuestions: (number: number) => void;
  setOptions: (number: number) => void;
  setQuestion: (question: IQuestion) => void;
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
      setCountQuestions: number =>
        set(data => ({ ...data, countQuestions: number })),
      setOptions: numbers =>
        set(data => ({ ...data, selectedOptions: numbers })),
      setStep: number => set(data => ({ ...data, step: number })),
      setQuestion: question => set(data => ({ ...data, question })),
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
