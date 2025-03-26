import { useMutation } from '@tanstack/react-query';
import { kyInstance } from '@/apis/instance.ts';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: async (data: LoginRequest) => {
      const response = await kyInstance.post<LoginResponse>('auth/login', {
        json: data,
      });
      return response.json();
    },
  });
};
