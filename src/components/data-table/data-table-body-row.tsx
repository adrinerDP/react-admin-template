import { flexRender, Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table.tsx';
import clsx from 'clsx';
import React from 'react';

type Props<T> = {
  row: Row<T>;
  rowIndex: number;
  onClickRow?: (row: T) => void;
  isTruncate: boolean;
};

export function BodyRow<T>({ row, onClickRow, isTruncate }: Props<T>) {
  return (
    <TableRow
      key={row.id}
      className={clsx(onClickRow && 'cursor-pointer')}
      onClick={(e) => {
        e.stopPropagation();
        onClickRow && onClickRow(row.original);
      }}
    >
      {row.getVisibleCells().map((cell) => {
        const isDropdown = !!cell.column.columnDef.meta?.hasOwnProperty('dropdown');
        const isMonospaced = !!cell.column.columnDef.meta?.hasOwnProperty('monospaced');

        return (
          <TableCell
            key={cell.id}
            className={clsx(
              isTruncate ? 'truncate' : 'whitespace-break-spaces',
              isDropdown && 'px-4',
              isMonospaced && 'font-mono',
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
