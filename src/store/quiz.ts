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
  editQuestionLimit: (questionIndex: number, limit: number) => void;
  editQuestionPoints: (questionIndex: number, points: number) => void;
  editQuestion: (
    questionIndex: number,
    data: Omit<IQuestion, 'options'>,
  ) => void;
  addOption: (questionIndex: number) => void;
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
  editQuestionLimit: (questionIndex, limit) =>
    set(state => ({
      store: [
        ...state.store.map((item, i) =>
          questionIndex == i ? { ...item, limit } : item,
        ),
      ],
    })),
  editQuestionPoints: (questionIndex, points) =>
    set(state => ({
      store: [
        ...state.store.map((item, i) =>
          questionIndex == i ? { ...item, points } : item,
        ),
      ],
    })),
  editQuestion: (questionIndex, data) =>
    set(state => ({
      store: [
        ...state.store.map((item, i) => (questionIndex == i ? data : item)),
      ],
    })),
  addOption: questionIndex =>
    set(state => {
      const question = state.store[questionIndex];
      if (!question) return state;

      const newOptions = question.options
        ? [...question.options, { text: '', isCorrect: false }]
        : [{ text: '', isCorrect: false }];

      const updatedQuestion = { ...question, options: newOptions };

      return {
        store: state.store.map((item, i) =>
          i === questionIndex ? updatedQuestion : item,
        ),
      };
    }),
}));
