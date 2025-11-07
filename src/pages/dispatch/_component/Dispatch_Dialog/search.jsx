import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import RoleBasedFilters from "../../../overview/_component/filter-sheet/role-based-filters";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useSearchVerifiedOnDispatchQuery } from "@/features/dispatch/dispatchAPI";

export default function DispatchSearch({
  value,
  onChange,
  placeholder,
  selectedCount = 0,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(searchValue);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [startDisabled, setStartDisabled] = useState(false);
  const params = {
    invoiceNo: 0,
    cusCode: "",
  };

  const handleStart = () => {
    setStartDisabled(true);
    setDeliveryDisabled(false);
    if (onClose) onClose();
  };
  const {
    data: searchOptions,
    isLoading,
    isError,
  } = useSearchVerifiedOnDispatchQuery(debounceValue, {
    skip: !debounceValue,
  });


  return (
    <section className="flex justify-between items-center space-x-12 w-full">
      <div className="relative w-1/2 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-52 pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>
      {selectedCount > 0 && (
        <p className="text-sm text-muted-foreground">{selectedCount} selected</p>
      )}

      {/* Put Filter Options here */}
      <div className="flex-1 flex flex-col justify-end">
        {/* <Label className="text-xs text-muted-foreground">Filter by Customer Code</Label> */}
        <RoleBasedFilters
          // filters={customerFilters}
          selectedFilters={selectedFilters}
          onChange={(key, val) =>
            setSelectedFilters((prev) => ({ ...prev, [key]: val }))
          }
        />
      </div>
    </section>
  );
}
