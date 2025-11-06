import { useMutation, useQuery } from 'react-query';
import userService from '@api/services/User';
import {
  IUser,
  IUserLogin,
  IUserRegister,
  IUserRegisterRes,
  IUserTokens,
  IUserUpdate,
} from '@/types/User';
import { AxiosError } from 'axios';

export const useLogin = (
  onSuccess?: (data: { data: IUserTokens }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
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
    // @ts-ignore
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

export const useProfileWithoutEnabled = (
  onSuccess?: (data: { data: IUser }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
    enabled: false,
    onSuccess,
    onError,
  });
};

export const useProfileUpdate = (
  onSuccess?: (data: { data: IUser }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['profile-update'],
    mutationFn: (body: IUserUpdate) => userService.update(body),
    onSuccess,
    onError,
  });
};

export const useGetUsersByIds = (
  onSuccess?: (data: { data: IUser[] }) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    mutationKey: ['users-ids'],
    mutationFn: (usersId: number[]) => userService.getUsersByIds(usersId),
    onSuccess,
    onError,
  });
};
