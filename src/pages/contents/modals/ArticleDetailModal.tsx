import React from 'react';
import { ArticleListItem } from '@/apis/contents/useArticleListQuery.ts';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { DisplayTable, DisplayTableBody, DisplayTableHead, DisplayTableRow } from '@/components/display-table/display-table.tsx';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button.tsx';
import { Pencil, Trash } from 'lucide-react';

type Props = {
  item: ArticleListItem;
  onClose: () => void;
};

const ArticleDetailModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시글 상세</DialogTitle>
          <div className="flex flex-col pt-3 gap-4">
            <DisplayTable>
              <DisplayTableRow>
                <DisplayTableHead>제목</DisplayTableHead>
                <DisplayTableBody>{item.title}</DisplayTableBody>
              </DisplayTableRow>
              <DisplayTableRow>
                <DisplayTableHead>작성자</DisplayTableHead>
                <DisplayTableBody>{item.author}</DisplayTableBody>
              </DisplayTableRow>
              <DisplayTableRow>
                <DisplayTableHead>작성일시</DisplayTableHead>
                <DisplayTableBody>{format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')}</DisplayTableBody>
              </DisplayTableRow>
            </DisplayTable>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">
            <Pencil />
            수정
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">
                <Trash />
                삭제
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>이 게시글을 삭제할까요?</DialogTitle>
                <DialogDescription>게시글을 삭제하면 복구할 수 없습니다</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">취소</Button>
                </DialogClose>
                <Button variant="destructive">삭제</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDetailModal;
