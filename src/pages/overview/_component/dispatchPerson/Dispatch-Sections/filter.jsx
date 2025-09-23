import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DispatchFilterDesign() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block p-4">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        Filter
        <ChevronDown className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute mt-2 w-64 bg-white border rounded shadow-lg p-3 z-50">
          <div className="flex flex-col gap-2">
            <select className="border px-2 py-1 rounded text-sm">
              <option>Route</option>
              <option>Customer Name</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
