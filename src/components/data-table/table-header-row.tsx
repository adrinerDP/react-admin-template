import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { TableHead, TableRow } from '@/components/ui/table.tsx';
import React from 'react';

type Props<T> = {
  headerGroup: HeaderGroup<T>;
};

export function HeaderRow<T>({ headerGroup }: Props<T>) {
  return (
    <TableRow>
      {headerGroup.headers.map((header) => (
        <TableHead
          key={header.id}
          style={{
            width: header.column.columnDef.size,
            minWidth: header.column.columnDef.minSize,
            maxWidth: header.column.columnDef.maxSize,
          }}
        >
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
      ))}
    </TableRow>
  );
}
