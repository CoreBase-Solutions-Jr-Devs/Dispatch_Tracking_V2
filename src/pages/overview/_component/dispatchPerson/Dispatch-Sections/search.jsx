import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function DispatchSearch({
  placeholder = "DispatchNo/Cuscode",
  onSearch,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value); 
  };

  return (
    <section className="flex justify-between items-center w-full">
      <div className="relative w-1/2 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-50 pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>
    </section>
  );
}
