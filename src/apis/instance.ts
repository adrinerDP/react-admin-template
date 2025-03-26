import ky from 'ky';
import { LoginResponse } from '@/apis/auth/useLoginMutation.tsx';
import { sessionStorage } from '@/stores/persisted/session-storage.ts';

export const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = sessionStorage.get('auth.access_token');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, _, response) => {
        if (response.status !== 401) return;

        const refreshToken = sessionStorage.get('auth.refresh_token');
        if (!refreshToken) return;

        const tokenResponse = await ky
          .create({
            prefixUrl: import.meta.env.VITE_API_BASE_URL,
            throwHttpErrors: false,
          })
          .post<LoginResponse>('auth/refresh', { json: { refreshToken } });

        if (tokenResponse.status === 401) {
          sessionStorage.remove('auth.access_token');
          sessionStorage.remove('auth.refresh_token');
          return;
        } else {
          const tokens = await tokenResponse.json();

          sessionStorage.set('auth.access_token', tokens.accessToken);
          sessionStorage.set('auth.refresh_token', tokens.refreshToken);
          request.headers.set('Authorization', `Bearer ${tokens.accessToken}`);

          return ky(request);
        }
      },
    ],
  },
});
