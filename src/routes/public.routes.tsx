import { lazy } from 'react';
import { RouteItem } from '@/types/route.types.ts';

export const PUBLIC_ROUTES: RouteItem[] = [{ path: '/auth/login', Page: lazy(() => import('@/pages/Login.tsx')) }];
