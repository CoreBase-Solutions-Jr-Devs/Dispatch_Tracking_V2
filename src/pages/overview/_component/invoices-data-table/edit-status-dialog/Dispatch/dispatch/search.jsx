import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";

export default function DispatchSearch({
  value,
  onChange,
  placeholder = "DispatchNo/Customer Name",
}) {
  return (
    <section className="flex justify-between items-center w-full">
      <div className="relative w-1/2 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-70 pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>
    </section>
  );
}
