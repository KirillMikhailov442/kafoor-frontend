import { useMutation, useQuery } from 'react-query';
import userService from '@api/services/User';
import {
  IUser,
  IUserLogin,
  IUserRegister,
  IUserRegisterRes,
  IUserTokens,
} from '@/types/User';
import { AxiosError } from 'axios';

export const useLogin = (
  onSuccess?: (data: { data: IUserTokens }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (body: IUserLogin) => userService.login(body),
    onSuccess,
    onError,
  });
};

export const useRegister = (
  onSuccess?: (data: { data: IUserRegisterRes }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (body: IUserRegister) => userService.register(body),
    onSuccess,
    onError,
  });
};

export const useProfile = (
  onSuccess?: (data: { data: IUser }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
    onSuccess,
    onError,
  });
};
