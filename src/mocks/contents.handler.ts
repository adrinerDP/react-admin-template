import { http, HttpResponse } from 'msw';
import { guardJWT, withBaseURL } from '@/mocks/utils.ts';
import { fakerKO } from '@faker-js/faker';

export const contentsHandler = [
  http.get(withBaseURL('/contents/articles'), async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
      guardJWT(request) ??
      HttpResponse.json(
        Array(7)
          .fill(0)
          .map(() => ({
            id: fakerKO.string.uuid(),
            title: fakerKO.git.commitMessage(),
            author: fakerKO.person.fullName(),
            createdAt: fakerKO.date.recent().toISOString(),
          }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      )
    );
  }),
];
