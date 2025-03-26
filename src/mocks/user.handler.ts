import { http, HttpResponse } from 'msw';
import { guardJWT, withBaseURL } from '@/mocks/utils.ts';

export const userHandler = [
  http.get(withBaseURL('/users/me'), ({ request }) => {
    return guardJWT(request) ?? HttpResponse.json({ id: 'asdf' });
  }),
];
