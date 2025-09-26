import { IOption } from '@/types/Option';
import { IQuestion } from '@/types/Question';
import { IQuiz } from '@/types/Quiz';
import { create } from 'zustand';

interface QuizStore {
  index: number;
  setIndex: (newIndex: number) => void;
  store: IQuestion[];
  //   editQuiz: (data: Omit<IQuiz, 'questions'>) => void;
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  //   editQuestion: (data: Omit<IQuestion, 'options'>) => void;
  //   addOption: (questionId: number) => void;
  //   removeOption: (questionId: number, index: number) => void;
  //   editOption: (data: IOption) => void;
}

export const useQuiz = create<QuizStore>(set => ({
  index: 0,
  setIndex: (newIndex: number) =>
    set(state => ({
      ...state,
      index: newIndex,
    })),
  store: [
    {
      text: 'первый вопрос',
      limit: 10,
      points: 10,
    },
    {
      text: 'первый вопрос',
      limit: 15,
      points: 25,
    },
  ],
  addQuestion: () =>
    set(state => ({
      store: [...state.store, { text: '', limit: 10, points: 10 }],
    })),
  removeQuestion: (index: number) => {
    set(state => ({
      index: state.index == 0 ? 0 : --state.index,
      store: [...state.store.filter((_, i) => i != index)],
    }));
  },
}));
