import { useQuery } from '@tanstack/react-query';
import { kyInstance } from '@/apis/instance.ts';

export type UserProfileResponse = {
  id: string;
  name: string;
  email: string;
};

export const useProfileQuery = () => {
  return useQuery({
    enabled: false,
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await kyInstance.get<UserProfileResponse>('users/me');
      return response.json();
    },
  });
};
