import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import {
//   useGetSearchDeliveryInvoicesQuery,
//   useGetCustomerCodeSuggestionsQuery,
// } from "@/features/delivery/deliveryAPI";

export default function DeliverySearch({ isLoading, handleSearchInput }) {
  const [customerCode, setCustomerCode] = useState("");

  const handleInput = (e) => {
    setCustomerCode(e.target.value);
    handleSearchInput(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <section className="flex justify-between items-center w-full">
      <div className="relative w-1/2 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={customerCode}
          onChange={handleInput}
          placeholder="Enter Customer Code"
          className="w-full pl-9 pr-3 py-2 bg-gray-100"
        />
      </div>

      {/* <div className="flex items-center gap-2 w-1/2 pl-4">
        <Label className="text-xs font-medium">Dispatch No:</Label>
        <Label className="text-xs font-medium text-muted-foreground">2</Label>
      </div> */}
    </section>
  );
}
