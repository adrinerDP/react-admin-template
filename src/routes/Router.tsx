import React from 'react';
import { Outlet, Route, Routes } from 'react-router';
import AuthenticationContextProvider from '@/hocs/authentication-context.tsx';
import AccountContextProvider from '@/hocs/account-context.tsx';
import { PRIVATE_ROUTES } from '@/routes/private.routes.ts';
import { PUBLIC_ROUTES } from '@/routes/public.routes.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';

const Router: React.FC = () => (
  <Routes>
    <Route element={<PublicContext />}>
      {PUBLIC_ROUTES.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Route>

    <Route element={<PrivateContext />}>
      {PRIVATE_ROUTES.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Route>
  </Routes>
);

const PrivateContext: React.FC = () => (
  <AuthenticationContextProvider>
    <AccountContextProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </AccountContextProvider>
  </AuthenticationContextProvider>
);

const PublicContext: React.FC = () => (
  <AuthenticationContextProvider>
    <Outlet />
  </AuthenticationContextProvider>
);

export default Router;
