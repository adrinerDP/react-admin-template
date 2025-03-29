import React, { PropsWithChildren } from 'react';
import { HorizontalAlignment } from '@/types/common.types.ts';
import { cn } from '@/lib/utils.ts';

export const DisplayTable: React.FC<PropsWithChildren<{ caption?: string }>> = ({ children, caption }) => (
  <div className="flex flex-col gap-1">
    <div className="flex flex-col gap-0 border-y border-gray-400">{children}</div>
    {caption && (
      <div className="flex flex-row items-center justify-end">
        <span className="text-xs font-medium text-muted-foreground">{caption}</span>
      </div>
    )}
  </div>
);

export const DisplayTableRow: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-row border-b border-gray-200">{children}</div>
);

export const DisplayTableHead: React.FC<PropsWithChildren<{ align?: HorizontalAlignment; required?: boolean }>> = ({
  children,
  align = 'left',
  required = false,
}) => (
  <div
    className={cn(
      'flex flex-row w-36 bg-gray-100 items-center py-3 px-4 gap-0.5',
      align === 'left' && 'justify-start',
      align === 'center' && 'justify-center',
      align === 'right' && 'justify-end',
    )}
  >
    {required && <span>*</span>}
    <span className="font-bold text-sm">{children}</span>
  </div>
);

export const DisplayTableBody: React.FC<PropsWithChildren<{ align?: HorizontalAlignment }>> = ({
  children,
  align = 'left',
}) => (
  <div
    className={cn(
      'flex flex-col flex-1 justify-center py-3 px-4',
      align === 'left' && 'items-start',
      align === 'center' && 'items-center',
      align === 'right' && 'items-end',
    )}
  >
    <span className="text-sm">{children}</span>
  </div>
);
