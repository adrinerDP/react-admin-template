import { useQuery } from '@tanstack/react-query';
import { kyInstance } from '@/apis/instance.ts';

export const useProfileQuery = () => {
  return useQuery({
    enabled: false,
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await kyInstance.get('users/me');
      return response.json();
    },
  });
};
