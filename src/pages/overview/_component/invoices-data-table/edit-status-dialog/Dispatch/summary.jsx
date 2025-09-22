import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { DataTablePagination } from "@/components/data-table/table-pagination";

export default function DispatchSummary({ data = [] }) {
  const [pageNumber, setPageNumber] = useState(1); // Pagination state
  const [pageSize, setPageSize] = useState(7); // Page Size - fixed at 7

  const totalCount = data.length; // Document count
  const totalValue = data.reduce((sum, doc) => {
    const cleanAmount = parseFloat((doc.amount || "0").toString().replace(/,/g, "")); // Remove commas
    return sum + (isNaN(cleanAmount) ? 0 : cleanAmount); // 0 value if not a number
  },0).toFixed(2); // 2DP

  // Slice paginated data
  const paginatedData = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageNumber, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <section className="flex flex-col gap-2 mb-2">

      {/* Invoice list - 7 per page*/}
      <div className="text-xs border rounded p-2">
          {paginatedData.map((inv, idx) => (
            <div key={idx} className="flex justify-between py-1 border-b last:border-0">
              <span>{inv.invNo}</span>
              <span>{inv.amount}</span>
            </div>
          ))}
      </div>

      {/* Pagination controls */}
      <DataTablePagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        onPageChange={setPageNumber}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNumber(1); // reset to 1st page
        }}
      />

      {/* Total Aggregates */}
      <div className="flex flex-row justify-end gap-6 mt-2">
        <div className="flex items-center text-xs font-medium">
          <Label>Total Count:</Label>
          <Label className="ml-2">{totalCount}</Label>
        </div>
        <div className="flex items-center text-xs font-medium">
          <Label>Total Value:</Label>
          <Label className="ml-2">{totalValue}</Label>
        </div>
      </div>
    </section>
  );
}
