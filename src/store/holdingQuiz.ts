import { IQuestion } from '@/types/Question';
import { number } from 'zod';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface HoldingQuizStore {
  stage: 'expectation' | 'passing' | 'finish';
  step: number;
  question?: IQuestion;
  setQuestion: (question: IQuestion) => void;
  setStep: (number: number) => void;
  start: () => void;
  finish: () => void;
}

export const useHoldingQuiz = create<HoldingQuizStore>()(
  persist(
    set => ({
      stage: 'expectation',
      question: undefined,
      step: 0,
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
