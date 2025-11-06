import { useMutation, useQuery } from 'react-query';
import QuizService from '@api/services/Quiz';
import { AxiosError } from 'axios';
import {
  IQuiz,
  IQuizCreate,
  IQuizFinish,
  IQuizStart,
  IQuizUpdate,
} from '@/types/Quiz';

export const useGetMyQuizzes = (
  onSuccess?: (data: { data: IQuiz[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: () => QuizService.getAllOfUser(),
    onSuccess,
    onError,
  });
};

export const useCreateQuiz = (
  onSuccess?: (data: { data: IQuiz }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['create-quiz'],
    mutationFn: (body: IQuizCreate) => QuizService.create(body),
    onSuccess,
    onError,
  });
};

export const useGetQuiz = (
  id: number,
  onSuccess?: (data: { data: IQuiz }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => QuizService.findById(id),
    onSuccess,
    onError,
  });
};

export const useUpdateQuiz = (
  onSuccess?: (data: { data: IQuiz }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['quiz-update'],
    mutationFn: (body: IQuizUpdate) => QuizService.update(body),
    onSuccess,
    onError,
  });
};

export const useGetQuizWithoutEnabled = (
  id: number,
  onSuccess?: (data: { data: IQuiz }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => QuizService.findById(id),
    enabled: false,
    onSuccess,
    onError,
  });
};

export const useDeleteQuiz = (
  onSuccess?: (data: { data: string }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['quiz-delete'],
    mutationFn: (id: number) => QuizService.deleteById(id),
    onSuccess,
    onError,
  });
};

export const useStartQuiz = (
  onSuccess?: (data: { data: string }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['quiz-start'],
    mutationFn: (body: IQuizStart) => QuizService.start(body),
    onSuccess,
    onError,
  });
};

export const useFinishQuiz = (
  onSuccess?: (data: { data: string }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['quiz-finish'],
    mutationFn: (body: IQuizFinish) => QuizService.finish(body),
    onSuccess,
    onError,
  });
};

export const useRatingQuiz = (
  id: number,
  onSuccess?: (data: { data: string }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['quiz-rating', id],
    queryFn: () => QuizService.rating(id),
    select: data => data.data,
    onSuccess,
    onError,
  });
};
