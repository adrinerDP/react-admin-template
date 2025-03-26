import { lazy } from 'react';
import { RouteItem } from '@/types/route.types.ts';

export const PRIVATE_ROUTES: RouteItem[] = [
  { path: '/', Page: lazy(() => import('@/pages/Home.tsx')) },
  { path: '*', Page: lazy(() => import('@/pages/Home.tsx')) },
];
