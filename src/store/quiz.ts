import { IOption } from '@/types/Option';
import { IQuestion } from '@/types/Question';
import { IQuiz } from '@/types/Quiz';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface QuizStore {
  index: number;
  lastChanged: string;
  name: string;
  maxMembers: number;
  setIndex: (newIndex: number) => void;
  store: IQuestion[];
  setStore: (store: IQuestion[]) => void;
  editQuiz: (data: Pick<IQuiz, 'name' | 'maxMembers'>) => void;
  editQuizName: (name: string) => void;
  editQuizMaxMembers: (number: number) => void;
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  editQuestionText: (questionIndex: number, text: string) => void;
  editQuestionTimeLimit: (questionIndex: number, timeLimit: number) => void;
  editQuestionScores: (questionIndex: number, scores: number) => void;
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
  lastChanged: '',
  name: '',
  maxMembers: 2,
  setIndex: (newIndex: number) =>
    set(state => ({
      ...state,
      index: newIndex,
    })),
  store: [],
  setStore: data => set(state => ({ ...state, store: data })),
  editQuiz: data =>
    set(state => ({
      ...state,
      name: data.name,
      maxMembers: data.maxMembers,
    })),
  editQuizName: name =>
    set(state => ({
      ...state,
      name,
    })),
  editQuizMaxMembers: number =>
    set(state => ({
      ...state,
      maxMembers: number,
    })),
  addQuestion: () =>
    // @ts-ignore
    set(state => {
      const slug = uuidv4();
      return {
        lastChanged: `question@${slug}`,
        store: [
          ...state.store,
          { text: '', timeLimit: 10, scores: 10, slug, quizId: 0 },
        ],
      };
    }),
  removeQuestion: (index: number) => {
    set(state => ({
      index: state.index == 0 ? 0 : --state.index,
      lastChanged: state.store.find((_, i) => i == index)?.slug.includes('@')
        ? state.store.find((_, i) => i == index)?.slug
        : `question@${state.store.find((_, i) => i == index)?.slug}`,
      store: [...state.store.filter((_, i) => i != index)],
    }));
  },
  editQuestionText: (questionIndex, text) =>
    set(state => ({
      lastChanged: state.store
        .find((_, i) => i == questionIndex)
        ?.slug.includes('@')
        ? state.store.find((_, i) => i == questionIndex)?.slug
        : `question@${state.store.find((_, i) => i == questionIndex)?.slug}`,
      store: [
        ...state.store.map((item, i) =>
          questionIndex == i ? { ...item, text } : item,
        ),
      ],
    })),
  editQuestionTimeLimit: (questionIndex, timeLimit) =>
    set(state => ({
      lastChanged: state.store
        .find((_, i) => i == questionIndex)
        ?.slug.includes('@')
        ? state.store.find((_, i) => i == questionIndex)?.slug
        : `question@${state.store.find((_, i) => i == questionIndex)?.slug}`,
      store: [
        ...state.store.map((item, i) =>
          questionIndex == i ? { ...item, timeLimit } : item,
        ),
      ],
    })),
  editQuestionScores: (questionIndex, scores) =>
    set(state => ({
      lastChanged: state.store
        .find((_, i) => i == questionIndex)
        ?.slug.includes('@')
        ? state.store.find((_, i) => i == questionIndex)?.slug
        : `question@${state.store.find((_, i) => i == questionIndex)?.slug}`,
      store: [
        ...state.store.map((item, i) =>
          questionIndex == i ? { ...item, scores } : item,
        ),
      ],
    })),
  editQuestion: (questionIndex, data) =>
    set(state => ({
      lastChanged: state.store
        .find((_, i) => i == questionIndex)
        ?.slug.includes('@')
        ? state.store.find((_, i) => i == questionIndex)?.slug
        : `question@${state.store.find((_, i) => i == questionIndex)?.slug}`,
      store: [
        ...state.store.map((item, i) => (questionIndex == i ? data : item)),
      ],
    })),
  addOption: questionIndex =>
    // @ts-ignore
    set(state => {
      const question = state.store[questionIndex];
      const slug = uuidv4();
      if (!question) return state;

      const newOptions = question.options
        ? [
            ...question.options,
            { text: '', correct: false, slug: `option@${slug}` },
          ]
        : [{ text: '', correct: false, slug: `option@${slug}` }];

      const updatedQuestion = { ...question, options: newOptions };

      return {
        lastChanged: `option@${slug}`,
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

      return {
        lastChanged: question.options
          ?.find((_, i) => index == i)
          ?.slug.includes('@')
          ? question.options?.find((_, i) => index == i)?.slug
          : `option@${question.options?.find((_, i) => index == i)?.slug}`,
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
        lastChanged: question.options
          ?.find((_, i) => index == i)
          ?.slug.includes('@')
          ? question.options?.find((_, i) => index == i)?.slug
          : `option@${question.options?.find((_, i) => index == i)?.slug}`,
        store: state.store.map((item, i) =>
          i === questionIndex ? { ...item, options: newOptions } : item,
        ),
      };
    }),
}));
