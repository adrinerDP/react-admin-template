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
    title: '콘텐츠',
    url: '/contents',
    items: [{ title: '게시글', url: '/contents/articles' }],
  },
  {
    title: '사용자 (jsonplaceholder)',
    url: '/members',
    items: [
      { title: '고객', url: '/members/customers' },
      { title: '관리자', url: '/members/admins' },
    ],
  },
];
