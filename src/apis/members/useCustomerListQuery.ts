import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export type CustomerListItem = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type CustomerListResponse = CustomerListItem[];

export const useCustomerListQuery = () => {
  return useQuery({
    enabled: false,
    queryKey: ['members', 'customers', 'list'],
    queryFn: async () => {
      const response = await ky.get<CustomerListResponse>('https://jsonplaceholder.typicode.com/users');
      return response.json();
    },
  });
};
