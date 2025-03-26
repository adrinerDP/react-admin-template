import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}

const TablePagination = ({ currentPage, totalPage, onChangePage }: PaginationProps) => {
  const maxVisiblePages = 5;

  const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPage - 1, currentPage + Math.floor(maxVisiblePages / 2));

  const handlePrevClick = () => {
    if (currentPage <= 1) return;
    onChangePage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage >= totalPage) return;
    onChangePage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onChangePage(page);
    }
  };

  const renderPages = () => {
    const pages = [];

    if (currentPage < 5) {
      for (let i = 1; i <= Math.min(5, totalPage); i++) {
        pages.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink href="#" onClick={() => handlePageClick(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (totalPage > 5) {
        pages.push(<PaginationEllipsis key="more-right" />);
        pages.push(
          <PaginationItem key={totalPage} className="cursor-pointer">
            <PaginationLink href="#" onClick={() => handlePageClick(totalPage)} isActive={currentPage === totalPage}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else if (currentPage > totalPage - 4) {
      pages.push(
        <PaginationItem key={1} className="cursor-pointer">
          <PaginationLink href="#" onClick={() => handlePageClick(1)} isActive={currentPage === 1}>
            {1}
          </PaginationLink>
        </PaginationItem>,
      );
      pages.push(<PaginationEllipsis key="more-left" />);
      for (let i = Math.max(2, totalPage - 4); i <= totalPage; i++) {
        pages.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink href="#" onClick={() => handlePageClick(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      pages.push(
        <PaginationItem key={1} className="cursor-pointer">
          <PaginationLink href="#" onClick={() => handlePageClick(1)} isActive={currentPage === 1}>
            {1}
          </PaginationLink>
        </PaginationItem>,
      );
      pages.push(<PaginationEllipsis key="more-left" />);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink href="#" onClick={() => handlePageClick(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
      pages.push(<PaginationEllipsis key="more-right" />);
      pages.push(
        <PaginationItem key={totalPage} className="cursor-pointer">
          <PaginationLink href="#" onClick={() => handlePageClick(totalPage)} isActive={currentPage === totalPage}>
            {totalPage}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrevClick} />
        </PaginationItem>

        {renderPages()}

        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
