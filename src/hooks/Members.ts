import { IMember } from '@/types/Member';
import memberService from '@api/services/Member';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useGetQuizzessOfMember = (
  onSuccess?: (data: IMember[]) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['quizzes-of-member'],
    queryFn: () => memberService.getQuizzes(),
    select: data => data.data,
    onSuccess,
    onError,
  });
};
