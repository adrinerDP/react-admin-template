import './main.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './routes/Router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/toaster.tsx';

const enableMSW = async () => {
  // if (import.meta.env.MODE !== 'development') return;
  const { worker } = await import('./mocks/browser');
  return worker.start();
};

const root = createRoot(document.getElementById('root')!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

enableMSW().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>,
  ),
);
