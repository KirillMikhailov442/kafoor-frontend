import { IOption } from '@/types/Option';
import { IQuestion } from '@/types/Question';
import { IQuiz } from '@/types/Quiz';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface QuizStore {
  index: number;
  setIndex: (newIndex: number) => void;
  store: IQuestion[];
  //   editQuiz: (data: Omit<IQuiz, 'questions'>) => void;
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  editQuestionText: (questionIndex: number, text: string) => void;
  editQuestionLimit: (questionIndex: number, limit: number) => void;
  editQuestionPoints: (questionIndex: number, points: number) => void;
  editQuestion: (
    questionIndex: number,
    data: Omit<IQuestion, 'options'>,
  ) => void;
  addOption: (questionIndex: number) => void;
  removeOption: (questionIndex: number, index: number) => void;
  editOption: (questionIndex: number, index: number, data: IOption) => void;
}

export const useQuiz = create<QuizStore>(set => ({
  index: 0,
  setIndex: (newIndex: number) =>
    set(state => ({
      ...state,
      index: newIndex,
    })),
  store: [],
  addQuestion: () =>
    set(state => ({
      store: [
        ...state.store,
        { text: '', limit: 10, points: 10, id: uuidv4() },
      ],
    })),
  removeQuestion: (index: number) => {
    set(state => ({
      index: state.index == 0 ? 0 : --state.index,
      store: [...state.store.filter((_, i) => i != index)],
    }));
  },
  editQuestionText: (questionIndex, text) =>
    set(state => ({
      store: [
        ...state.store.map((item, i) =>
          questionIndex == i ? { ...item, text } : item,
        ),
      ],
    })),
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
        ? [...question.options, { text: '', isCorrect: false, id: uuidv4() }]
        : [{ text: '', isCorrect: false, id: uuidv4() }];

      const updatedQuestion = { ...question, options: newOptions };

      return {
        store: state.store.map((item, i) =>
          i === questionIndex ? updatedQuestion : item,
        ),
      };
    }),
  removeOption: (questionIndex, index) =>
    set(state => {
      const question = state.store[questionIndex];

      if (!question) return state;
      const newOptions = question.options?.filter((_, i) => index != i);
      console.log(
        state.store.map((item, i) =>
          i === questionIndex ? { ...item, options: newOptions } : item,
        ),
      );

      return {
        store: state.store.map((item, i) =>
          i === questionIndex ? { ...item, options: newOptions } : item,
        ),
      };
    }),
  editOption: (questionIndex, index, data) =>
    set(state => {
      const question = state.store[questionIndex];
      if (!question) return state;

      const newOptions = question.options?.map((item, i) =>
        i == index ? { ...item, ...data } : item,
      );
      return {
        store: state.store.map((item, i) =>
          i === questionIndex ? { ...item, options: newOptions } : item,
        ),
      };
    }),
}));
