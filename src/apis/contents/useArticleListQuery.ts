import { useQuery } from '@tanstack/react-query';
import { kyInstance } from '@/apis/instance.ts';
import { PageableQuery } from '@/types/api-query.types.ts';

export type ArticleListRequest = {
  title: string;
  dateFrom: string;
  dateTo: string;
};

export type ArticleListItem = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
};

export const useArticleListQuery = (searchParams: PageableQuery<ArticleListRequest>) => {
  return useQuery({
    enabled: false,
    queryKey: ['contents', 'article-list', searchParams],
    queryFn: async () => {
      const response = await kyInstance.get<ArticleListItem[]>('contents/articles', {
        searchParams,
      });
      return response.json();
    },
  });
};
