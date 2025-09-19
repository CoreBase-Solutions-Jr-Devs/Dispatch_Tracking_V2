import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import DispatchFilterPopup from "./filterpopup";

export default function DispatchFilter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center  p-4">
 
      <button
        className="flex items-center gap-2 px-3 py-1 border rounded-full hover:bg-gray-100"
        onClick={() => setOpen(true)}
      >
        <Filter className="h-5 w-5" />
        <span className="text-sm font-medium">Filter</span>
      </button>

    
      <DispatchFilterPopup open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
