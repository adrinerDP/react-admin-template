import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { DatePickerWithRange } from '@/components/inputs/date-range.picker.tsx';
import { Link } from 'react-router';
import { ArticleListItem, useArticleListQuery } from '@/apis/contents/useArticleListQuery.ts';
import { PaginationState } from '@tanstack/react-table';
import { PageableQuery } from '@/types/api-query.types.ts';
import { useTable } from '@/hooks/use-table.tsx';
import DataTable from '@/components/data-table/data-table.tsx';
import { format, parseISO } from 'date-fns';
import { Plus, Search, Trash } from 'lucide-react';
import ArticleDetailModal from '@/pages/contents/modals/ArticleDetailModal.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';

const formSchema = z.object({
  title: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  currentPage: z.number(),
  limit: z.number(),
});

type FormData = PageableQuery<z.infer<typeof formSchema>>;

const defaultValues: FormData = {
  title: undefined,
  dateFrom: undefined,
  dateTo: undefined,
  currentPage: 1,
  limit: 10,
};

const ArticleList: React.FC = () => {
  const [presentedItem, setPresentedItem] = useState<ArticleListItem | null>(null);

  const [queryData, setQueryData] = useState<FormData>(defaultValues);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 1, pageSize: 10 });

  const {
    data: articleList,
    isLoading: isLoadingArticleList,
    refetch: getArticleList,
  } = useArticleListQuery({
    title: queryData.title ?? '',
    dateFrom: queryData.dateFrom?.toISOString() ?? '',
    dateTo: queryData.dateTo?.toISOString() ?? '',
    currentPage: queryData.currentPage,
    limit: queryData.limit,
  });

  const [rowSelection, setRowSelection] = useState({});
  const form = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = (data: FormData) => setQueryData(data);
  const onReset = () => form.reset(defaultValues);

  const tableConfig = useTable<ArticleListItem>({
    enabledFeatures: ['select'],
    rowSelection,
    pagination,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    columns: (columnHelper) => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (cell) => cell.getValue(),
        size: 300,
      }),
      columnHelper.accessor('title', {
        header: '제목',
        cell: (cell) => cell.getValue(),
        size: 300,
      }),
      columnHelper.accessor('author', {
        header: '작성자',
        cell: (cell) => cell.getValue(),
        size: 150,
      }),
      columnHelper.accessor('createdAt', {
        header: '작성일',
        cell: (cell) => format(parseISO(cell.getValue()), 'yyyy.MM.dd'),
        size: 150,
      }),
    ],
  });

  useEffect(() => {
    void getArticleList();
  }, [queryData]);

  useEffect(() => {
    setQueryData({ ...queryData, currentPage: pagination.pageIndex });
  }, [pagination.pageIndex]);

  return (
    <>
      <main>
        <header className="flex shrink-0 items-center gap-2 p-4 border-b">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" asChild>
                  <Link to="/contents">콘텐츠</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>게시글</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <article className="flex flex-col gap-6 p-5">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-lg">게시글 관리</h1>
          </div>

          <Card className="shadow-none">
            <CardContent className="pt-5">
              <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>게시글 제목</FormLabel>
                          <FormControl>
                            <Input placeholder="게시글 제목 입력" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateFrom"
                      render={({ field: dateFromField }) => (
                        <FormField
                          control={form.control}
                          name="dateTo"
                          render={({ field: dateToField }) => (
                            <FormItem>
                              <FormLabel>게시글 작성일</FormLabel>
                              <FormControl>
                                <DatePickerWithRange
                                  placeholder="게시글 작성일 선택"
                                  dateFrom={dateFromField}
                                  dateTo={dateToField}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-row justify-end gap-2">
                    <Button variant="outline" type="submit" onClick={() => onReset}>
                      초기화
                    </Button>
                    <Button variant="default" type="submit" onClick={() => form.handleSubmit(onSubmit)}>
                      <Search />
                      검색
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex flex-row justify-between">
            <div />
            <div className="flex flex-row gap-2">
              <Dialog>
                <DialogTrigger disabled={Object.keys(rowSelection).length === 0}>
                  <Button variant="destructive" disabled={Object.keys(rowSelection).length === 0}>
                    <Trash />
                    삭제
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>선택한 게시글을 삭제할까요?</DialogTitle>
                    <DialogDescription>게시글을 삭제하면 복구할 수 없습니다</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setRowSelection({})}>
                      취소
                    </Button>
                    <Button variant="destructive" onClick={() => setRowSelection({})}>
                      삭제
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Plus />
                신규 등록
              </Button>
            </div>
          </div>

          <DataTable
            data={articleList ?? []}
            rowsPerPage={7}
            isLoading={isLoadingArticleList}
            config={tableConfig}
            emptyMessage="게시글이 없어요"
            onClickRow={setPresentedItem}
          />
        </article>
      </main>

      {presentedItem && <ArticleDetailModal item={presentedItem} onClose={() => setPresentedItem(null)} />}
    </>
  );
};

export default ArticleList;
