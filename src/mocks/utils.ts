import { HttpResponse } from 'msw';
import { isAfter, parseISO } from 'date-fns';

export const withBaseURL = (path: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

export const guardJWT = (req: Request) => {
  const now = new Date();
  const token = req.headers.get('Authorization');

  if (!token) {
    return HttpResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
  }

  const [, tokenData] = token.split(' ');
  const [tokenType, tokenValue] = tokenData.split(':');

  if (tokenType !== 'access') {
    return HttpResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
  }

  if (!isAfter(now, parseISO(tokenValue))) {
    return HttpResponse.json({ message: 'TOKEN_EXPIRED' }, { status: 401 });
  }

  return null;
};
