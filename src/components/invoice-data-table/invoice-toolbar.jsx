import React, { useState, useEffect } from "react";
import {
  AdminSummaryCards,
  StoreSummaryCards,
  VerificationSummaryCards,
  DispatchSummaryCards,
} from "./status-summary-card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function InvoiceToolbar({
  role = "admin",
  placeholder = "Invoice No,Cust Name",
}) {
  const [searchValue, setSearchValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(searchValue);

  // const {
  //   data: searchOptions,
  //   isLoading,
  //   isError,
  // } = useDispatchSearchQuery(debounceValue, {
  //   skip: !debounceValue,
  // });

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(searchValue), 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const renderSummaryCards = () => {
    switch (role.toLowerCase()) {
      case "admin":
        return <AdminSummaryCards />;
      case "store":
        return <StoreSummaryCards />;
      case "verification":
        return <VerificationSummaryCards />;
      case "dispatch":
        return <DispatchSummaryCards />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="relative flex-1 flex flex-col max-w-xs">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>

      <div className="flex items-center ml-auto">{renderSummaryCards()}</div>
    </div>
  );
}
