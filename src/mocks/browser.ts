import { setupWorker } from 'msw/browser';
import { userHandler } from '@/mocks/user.handler.ts';
import { authHandler } from '@/mocks/auth.handler.ts';
import { contentsHandler } from '@/mocks/contents.handler.ts';

export const worker = setupWorker(...[userHandler, authHandler, contentsHandler].flat());
