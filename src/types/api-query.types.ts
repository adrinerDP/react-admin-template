export type PageableQuery<T> = T & {
  currentPage: number;
  limit: number;
};
