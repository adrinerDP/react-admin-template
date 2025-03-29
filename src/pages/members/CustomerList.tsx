import React, { useEffect, useState } from 'react';
import { CustomerListItem, useCustomerListQuery } from '@/apis/members/useCustomerListQuery.ts';
import { useTable } from '@/hooks/use-table.tsx';
import DataTable from '@/components/data-table/data-table.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Link } from 'react-router';
import { PaginationState } from '@tanstack/react-table';

const CustomerList: React.FC = () => {
  const { data: customerList, isLoading: isLoadingCustomerList, refetch: getCustomerList } = useCustomerListQuery();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 1, pageSize: 1 });

  const tableConfig = useTable<CustomerListItem>({
    pagination,
    onPaginationChange: setPagination,
    columns: (columnHelper) => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (cell) => cell.getValue(),
        size: 60,
      }),
      columnHelper.accessor('username', {
        header: '아이디',
        cell: (cell) => cell.getValue().toLowerCase(),
        size: 120,
      }),
      columnHelper.accessor('name', {
        header: '이름',
        cell: (cell) => cell.getValue(),
        size: 150,
      }),
      columnHelper.accessor('email', {
        header: '이메일',
        cell: (cell) => cell.getValue(),
        size: 150,
      }),
      columnHelper.accessor('address.city', {
        header: '지역',
        cell: (cell) => cell.getValue(),
        size: 120,
      }),
      columnHelper.accessor('company.name', {
        header: '재직 회사',
        cell: (cell) => cell.getValue(),
        size: 120,
      }),
      columnHelper.accessor('phone', {
        header: '연락처',
        cell: (cell) => cell.getValue(),
        size: 120,
      }),
    ],
  });

  useEffect(() => {
    void getCustomerList();
  }, [getCustomerList]);

  return (
    <>
      <main>
        <header className="flex shrink-0 items-center gap-2 p-4 border-b">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" asChild>
                  <Link to="/contents">사용자</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>고객</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <article className="flex flex-col gap-6 p-5">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-lg">고객 관리</h1>
          </div>

          <DataTable isLoading={isLoadingCustomerList} data={customerList ?? []} config={tableConfig} />
        </article>
      </main>
    </>
  );
};

export default CustomerList;
