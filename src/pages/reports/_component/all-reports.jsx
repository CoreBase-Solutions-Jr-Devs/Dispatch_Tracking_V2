import { DataTable } from "@/components/data-table";
import { useGetAllReportsQuery } from "@/features/reports/reportsAPI";
import { useState } from "react";
import { reportsColumns } from "./column";
import React from "react";

const AllReports = () => {
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data, isFetching } = useGetAllReportsQuery({
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  });

  const reportData = data?.reports || [];

  const pagination = {
    totalCount: data?.pagination?.totalCount || 0,
    totalPages: data?.pagination?.totalPages || 0,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  };

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  return (
    <DataTable
      data={reportData}
      columns={reportsColumns}
      isLoading={isFetching}
      selection={false}
      showSearch={false}
      emptyTitle={"No reports created"}
      isShowPagination={true}
      pagination={pagination}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};

export default AllReports;
