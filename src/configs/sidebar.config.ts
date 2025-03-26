export type SideBarItem = {
  title: string;
  url: string;
  items: Omit<SideBarItem, 'items'>[];
};

export const SIDEBAR_CONFIG: SideBarItem[] = [
  {
    title: '대시보드',
    url: '/dashboard',
    items: [],
  },
  {
    title: '콘텐츠 관리',
    url: '/contents',
    items: [{ title: '게시글', url: '/contents/articles' }],
  },
];
