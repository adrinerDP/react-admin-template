import React, { PropsWithChildren } from 'react';
import { AppSidebar } from '@/components/layouts/app-sidebar.tsx';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
