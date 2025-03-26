/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef, ColumnHelper, createColumnHelper, getPaginationRowModel, PaginationState, Table, TableOptions } from '@tanstack/react-table';
import { Dispatch, RefObject, SetStateAction, useMemo, useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox.tsx';

type PartialTableConfig<T> = Pick<
  TableOptions<T>,
  'columns' | 'getRowId' | 'onPaginationChange' | 'state' | 'manualPagination' | 'enableRowSelection' | 'getPaginationRowModel'
>;

type TableFeatures = 'select';

export type UseTableProps<T> = {
  idColumn?: keyof T;
  enabledFeatures?: TableFeatures[];
  columns: (columnHelper: ColumnHelper<T>) => ColumnDef<T, any>[];
  rowSelection?: Record<string, boolean>;
  onRowSelectionChange?: Dispatch<SetStateAction<Record<string, boolean>>>;
  pagination?: PaginationState;
  onPaginationChange?: Dispatch<SetStateAction<PaginationState>>;
};

export type UseTableResult<T> = {
  table: RefObject<Table<T> | null>;
  tableConfig: PartialTableConfig<T>;
  minWidth: number;
  pagination?: PaginationState;
  onPaginationChange?: Dispatch<SetStateAction<PaginationState>>;
};

export function useTable<T>({
  idColumn,
  enabledFeatures = [],
  columns,
  rowSelection,
  onRowSelectionChange,
  pagination,
  onPaginationChange,
}: UseTableProps<T>): UseTableResult<T> {
  const columnHelper = createColumnHelper<T>();

  const checkboxColumn = useMemo<ColumnDef<T>>(
    () => ({
      id: '$$select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <div className="size-4">
          <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
        </div>
      ),
      size: 30,
    }),
    [],
  );

  const totalColumns = useMemo<ColumnDef<T, any>[]>(() => {
    const cols: ColumnDef<T, any>[] = [];
    if (enabledFeatures.includes('select')) {
      cols.push(checkboxColumn);
    }
    cols.push(...columns(columnHelper));
    return cols;
  }, [enabledFeatures, columns, columnHelper, checkboxColumn]);

  const tableConfig = useMemo<PartialTableConfig<T>>(
    () => ({
      columns: totalColumns.filter(Boolean) as ColumnDef<T, any>[],
      getRowId: (row) => (idColumn ? (row[idColumn] as number)?.toString() : (row as T & { id: number }).id.toString()),
      onPaginationChange,
      state: {
        pagination: pagination ? pagination : undefined,
        rowSelection,
        columnVisibility: Object.fromEntries(totalColumns.map((column) => [column?.id, !column?.id?.startsWith('##')])),
      },
      onRowSelectionChange,
      manualPagination: !!pagination,
      enableRowSelection: enabledFeatures.includes('select'),
      getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    }),
    [totalColumns, pagination, onPaginationChange, enabledFeatures],
  );

  const table = useRef<Table<T> | null>(null);

  return {
    table,
    tableConfig,
    pagination,
    onPaginationChange,
    minWidth: totalColumns.reduce((acc, column) => acc + (column.size ?? 100), 0),
  };
}
