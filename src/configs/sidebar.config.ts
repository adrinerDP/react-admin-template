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
    title: 'Getting Started',
    url: '/getting-started',
    items: [
      { title: 'Installation', url: '/getting-started/installation' },
      { title: 'Project Structure', url: '/getting-started/project-structure' },
    ],
  },
  {
    title: 'Building Your Application',
    url: '/building',
    items: [
      { title: 'Routing', url: '/building/routing' },
      { title: 'Data Fetching', url: '/building/data-fetching' },
      { title: 'Rendering', url: '/building/rendering' },
      { title: 'Caching', url: '/building/caching' },
      { title: 'Styling', url: '/building/styling' },
      { title: 'Optimizing', url: '/building/optimizing' },
      { title: 'Configuring', url: '/building/configuring' },
      { title: 'Testing', url: '/building/testing' },
      { title: 'Authentication', url: '/building/authentication' },
      { title: 'Deploying', url: '/building/deploying' },
      { title: 'Upgrading', url: '/building/upgrading' },
      { title: 'Examples', url: '/building/examples' },
    ],
  },
  {
    title: 'API Reference',
    url: '/api-reference',
    items: [
      { title: 'Components', url: '/api-reference/components' },
      { title: 'File Conventions', url: '/api-reference/file-conventions' },
      { title: 'Functions', url: '/api-reference/functions' },
      {
        title: 'next.config.js Options',
        url: '/api-reference/next.config.js-options',
      },
      { title: 'CLI', url: '/api-reference/cli' },
      { title: 'Edge Runtime', url: '/api-reference/edge-runtime' },
    ],
  },
  {
    title: 'Architecture',
    url: '/architecture',
    items: [
      { title: 'Accessibility', url: '/architecture/accessibility' },
      { title: 'Fast Refresh', url: '/architecture/fast-refresh' },
      { title: 'Next.js Compiler', url: '/architecture/next.js-compiler' },
      { title: 'Supported Browsers', url: '/architecture/supported-browsers' },
      { title: 'Turbopack', url: '/architecture/turbopack' },
    ],
  },
];
