import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useTypedSelector } from "@/app/hook";

export default function InvoiceToolbar({
  role = "admin",
  placeholder = "Invoice No,Cust Name",
  searchValue,
  setSearchValue,
}) {
  const [debounced, setDebounced] = useState(searchValue);

  const { queryFilter } = useTypedSelector((state) => state.invoice);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(searchValue), 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";

  return (
    <div className="flex items-center w-full gap-x-4">
      {/* Search input */}
      <div className="relative flex-1 max-w-xs">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>

      {/* Date range */}
      <div className="flex items-center gap-2 text-sm font-medium px-2">
        <span className="text-red-600">From:</span>
        <span>{formatDate(queryFilter?.startDate)}</span>
        <span className="text-red-600">To:</span>
        <span>{formatDate(queryFilter?.endDate)}</span>
        <span className="text-red-600">Status:</span>
        <span>{queryFilter?.status}</span>
      </div>
    </div>
  );
}
