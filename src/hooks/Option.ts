import { IOption, IOptionCreate, IOptionUpdate } from '@/types/Option';
import OptionService from '@api/services/Option';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const useGetOptions = (
  questionId: string,
  onSuccess?: (data: { data: IOption[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['options'],
    queryFn: () => OptionService.getAllOfQuestion(questionId),
    onSuccess,
    onError,
  });
};

export const useAddOptions = (
  onSuccess?: (data: { data: IOption[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['option-add'],
    mutationFn: (body: IOptionCreate) => OptionService.add(body),
    onSuccess,
    onError,
  });
};

export const useEditOptions = (
  onSuccess?: (data: { data: IOption[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['option-edit'],
    mutationFn: (body: IOptionUpdate) => OptionService.edit(body),
    onSuccess,
    onError,
  });
};

export const useDeleteOptions = (
  onSuccess?: (data: { data: IOption[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['option-delete'],
    mutationFn: (optionId: string) => OptionService.remove(optionId),
    onSuccess,
    onError,
  });
};
