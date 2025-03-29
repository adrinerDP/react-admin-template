import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { RowData } from '@tanstack/table-core';
import React, { useEffect, useRef, useState } from 'react';
import { UseTableResult } from '@/hooks/use-table.tsx';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table.tsx';
import DataTablePagination from '@/components/data-table/data-table-pagination.tsx';
import { HeaderRow } from '@/components/data-table/data-table-header-row.tsx';
import { BodyRow } from '@/components/data-table/data-table-body-row.tsx';
import { cn } from '@/lib/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

type Props<T> = {
  data: T[];
  rowsPerPage?: number;
  config: UseTableResult<T>;
  onClickRow?: (row: T) => void;
  emptyMessage?: string;
  isTruncate?: boolean;
  isLoading?: boolean;
};

function DataTable<T extends RowData>({
  config,
  data,
  rowsPerPage = 10,
  onClickRow,
  emptyMessage,
  isLoading,
  isTruncate = false,
}: Props<T>) {
  const { pagination, onPaginationChange, tableConfig, table } = config;
  const [rowData, setRowData] = useState<T[]>(data);
  const prevDataRef = useRef<T[]>(data);

  useEffect(() => {
    if (prevDataRef.current === data) return;
    setRowData(data);
    prevDataRef.current = data;
  }, [data]);

  table.current = useReactTable({
    ...tableConfig,
    data: rowData,
    defaultColumn: {},
    rowCount: data.length,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className={cn('flex flex-col gap-0 overflow-x-scroll', `min-w-[${config.minWidth}px]`)}>
        <Table className="table-fixed">
          <TableHeader>
            {table.current.getHeaderGroups().map((headerGroup) => (
              <HeaderRow key={headerGroup.id} headerGroup={headerGroup} />
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading && emptyMessage && rowData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={table.current.getAllColumns().length}
                  className="py-[18px] text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}

            {isLoading &&
              Array(rowsPerPage)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    {Array(table.current?.getAllColumns().length)
                      .fill(0)
                      .map((_, j) => (
                        <TableCell key={`${i}-${j}`}>
                          <Skeleton className="w-full h-[20px]" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))}

            {table.current.getRowModel().rows.map((row, rowIndex) => (
              <BodyRow key={row.id} row={row} rowIndex={rowIndex} onClickRow={onClickRow} isTruncate={isTruncate} />
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && onPaginationChange && (
        <DataTablePagination
          currentPage={pagination.pageIndex}
          totalPage={pagination.pageSize}
          onChangePage={(pageIndex) => onPaginationChange({ ...pagination, pageIndex })}
        />
      )}
    </div>
  );
}

export default DataTable;
