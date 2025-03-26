import { setupWorker } from 'msw/browser';
import { userHandler } from '@/mocks/user.handler.ts';
import { authHandler } from '@/mocks/auth.handler.ts';

export const worker = setupWorker(...[userHandler, authHandler].flat());
