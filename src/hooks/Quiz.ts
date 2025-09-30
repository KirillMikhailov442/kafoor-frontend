import { useQuery } from 'react-query';
import QuizService from '@api/services/Quiz';
import { AxiosError } from 'axios';

export const useGetMyQuizzes = (
  onSuccess?: (data: { data: string }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: () => QuizService.getAllOfUser(),
    onSuccess,
    onError,
  });
};
