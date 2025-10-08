import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DispatchSearch({
  placeholder = "DispatchNo/Route/Dispatcher",
  onSearch,
  searchValue,
  setSearchValue,
}) {
  const [debounced, setDebounced] = useState(searchValue);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(searchValue), 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // Trigger parent search callback when debounced value changes
  useEffect(() => {
    if (onSearch) onSearch(debounced);
  }, [debounced]);

  return (
    <section className="flex justify-between items-center w-full">
      <div className="relative w-1/2 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-60 pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>
    </section>
  );
}
