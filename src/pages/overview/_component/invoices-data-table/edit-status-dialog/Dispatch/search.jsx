import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import RoleBasedFilters from "../../../filter-sheet/role-based-filters";
import { useDispatchSearchQuery } from "@/features/dispatch/dispatchAPI";

export default function DispatchSearch({
  value,
  onChange,
  placeholder = "Invoice No",
  selectedCount = 0,
}) {
  const [searchaValue,setSearchValue] =useState("")
  const [debounceValue,setDebounceValue] = useState(searchaValue)
  const [selectedFilters, setSelectedFilters] = useState({});
  const [startDisabled, setStartDisabled] = useState(false);
  const params = {
    invoiceNo: 0,
    cusCode: "",
  }
  
  const handleStart = () => {
    setStartDisabled(true);
    setDeliveryDisabled(false);
    if (onClose) onClose();
  };
  const { data, isLoading, isError } = useDispatchSearchQuery(searchaValue);

  useEffect(() => {
   const handler = setTimeout(()=>
    setDebounceValue(searchaValue)
    , 1000)

   return () => {clearTimeout(handler)}
  }, [searchaValue])
  

  return (
    <section className="flex justify-between items-center space-x-12 w-full">
      <div className="relative w-1/2 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={searchaValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-40 pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>

      {/* Put Filter Options here */}
      <div className="flex-1 flex flex-col justify-end">
        <Label className="text-xs text-muted-foreground">Filter by Customer Name</Label>
        <RoleBasedFilters
            selectedFilters={selectedFilters}
            onChange={(key, val) => setSelectedFilters(prev => ({ ...prev, [key]: val }))}
        />
      </div>

    </section>
  );
}
