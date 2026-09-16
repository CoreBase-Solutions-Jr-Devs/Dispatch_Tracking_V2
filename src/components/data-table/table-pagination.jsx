import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTablePagination({
  pageNumber,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) {
  const handlePageSizeChange = (newSize) => {
    onPageSizeChange?.(newSize);
  };

  const handlePageChange = (newPage) => {
    onPageChange?.(newPage);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-2">
      {/* Showing X to Y of Z Rows */}
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {(pageNumber - 1) * pageSize + 1}-
        {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-x-8 lg:space-y-0">
        {/* Rows Per Page Selector */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const size = Number(value);
              onPageChange?.(1);
              handlePageSizeChange(size);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-gray-200">
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div className="flex items-center">
          <div className="flex lg:w-[100px] items-center justify-center text-sm font-medium">
            Page {pageNumber} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft /> Previous
            </Button>

            {/* <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pageNumber <= 3) {
                  pageNum = i + 1;
                } else if (pageNumber >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = pageNumber - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNumber === pageNum ? "default" : "outline"}
                    className="h-8 w-8 p-0"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div> */}

            <div className="flex items-center space-x-1">
              {(() => {
                let pages = [];

                if (totalPages <= 5) {
                  pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                } else if (pageNumber <= 3) {
                  pages = [1, 2, 3, 4, 5];
                } else if (pageNumber >= totalPages - 2) {
                  pages = [
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  ];
                } else {
                  pages = [
                    1,
                    pageNumber - 1,
                    pageNumber,
                    pageNumber + 1,
                    totalPages,
                  ];
                }

                // Remove duplicates and sort
                pages = [...new Set(pages)].sort((a, b) => a - b);

                return pages.map((pageNum, index) => {
                  const previousPage = pages[index - 1];

                  return (
                    <React.Fragment key={pageNum}>
                      {index > 0 && pageNum - previousPage > 1 && (
                        <span className="px-1">...</span>
                      )}

                      <Button
                        variant={pageNumber === pageNum ? "default" : "outline"}
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    </React.Fragment>
                  );
                });
              })()}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages}
            >
              <span className="sr-only">Go to next page</span>
              Next <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
