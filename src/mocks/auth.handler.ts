import { http, HttpResponse } from 'msw';
import { withBaseURL } from '@/mocks/utils.ts';
import { LoginResponse } from '@/apis/auth/useLoginMutation.ts';
import { addMinutes, addWeeks, isAfter } from 'date-fns';
import { z } from 'zod';

const loginRequest = z.object({ username: z.string(), password: z.string() }).required();

export const authHandler = [
  http.post(withBaseURL('/auth/login'), async ({ request }) => {
    const { username, password } = loginRequest.parse(await request.json());

    if (username === 'admin' && password === 'qwerty1234') {
      return HttpResponse.json<LoginResponse>(generateTokens());
    } else {
      return HttpResponse.json({ message: 'USER_NOT_FOUND' }, { status: 404 });
    }
  }),
  http.post(withBaseURL('/auth/refresh'), async ({ request }) => {
    const now = new Date();

    const reqData = (await request.json()) as { refreshToken: string };
    const [tokenType, tokenValue] = reqData.refreshToken.split(':');

    if (tokenType !== 'refresh') {
      return HttpResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
    }

    if (isAfter(now, new Date(parseInt(tokenValue)))) {
      return HttpResponse.json({ message: 'TOKEN_EXPIRED' }, { status: 401 });
    }

    return HttpResponse.json<LoginResponse>(generateTokens());
  }),
];

const generateTokens = () => {
  const now = new Date();

  return {
    accessToken: `access:${addMinutes(now, 1).getTime()}`,
    refreshToken: `refresh:${addWeeks(now, 2).getTime()}`,
  };
};
