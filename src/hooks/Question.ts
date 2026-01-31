import { useMutation, useQuery } from 'react-query';
import QuestionService from '@api/services/Question';
import { IQuestion, IQuestionCreate, IQuestionUpdate } from '@/types/Question';
import { AxiosError } from 'axios';

export const useGetQuestions = (
  quizId: number,
  onSuccess?: (data: { data: IQuestion[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: () => QuestionService.getAllOfQuiz(quizId),
    onSuccess,
    onError,
  });
};

export const useAddGuestion = (
  onSuccess?: (data: { data: IQuestion[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['question-add'],
    mutationFn: (body: IQuestionCreate) => QuestionService.add(body),
    onSuccess,
    onError,
  });
};

export const useEditGuestion = (
  onSuccess?: (data: { data: IQuestion[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['question-edit'],
    mutationFn: (body: IQuestion) => QuestionService.edit(body),
    onSuccess,
    onError,
  });
};

export const useDeleteGuestion = (
  onSuccess?: (data: { data: string }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['question-delete'],
    mutationFn: (questionId: string) => QuestionService.remove(questionId),
    onSuccess,
    onError,
  });
};
