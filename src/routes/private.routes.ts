import { lazy } from 'react';
import { RouteItem } from '@/types/route.types.ts';

export const PRIVATE_ROUTES: RouteItem[] = [
  { path: '/', Page: lazy(() => import('@/pages/Home.tsx')) },

  // 콘텐츠
  {
    path: '/contents/articles',
    Page: lazy(() => import('@/pages/contents/ArticleList.tsx')),
  },

  { path: '*', Page: lazy(() => import('@/pages/Home.tsx')) },
];
