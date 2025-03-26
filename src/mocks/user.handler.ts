import { http, HttpResponse } from 'msw';
import { guardJWT, withBaseURL } from '@/mocks/utils.ts';

export const userHandler = [
  http.get(withBaseURL('/users/me'), ({ request }) => {
    return (
      guardJWT(request) ??
      HttpResponse.json({
        id: '2f785472-b10b-4bf4-b26a-d78cbb5bb4d6',
        name: '관리자',
        email: 'admin@adrinerlab.co.kr',
      })
    );
  }),
];
