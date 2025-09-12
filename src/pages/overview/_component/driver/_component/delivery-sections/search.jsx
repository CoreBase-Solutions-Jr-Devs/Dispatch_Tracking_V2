import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCustomerCodeSuggestionsQuery } from "@/features/delivery/deliveryAPI";
import { useGetSearchDeliveryInvoicesQuery } from "@/features/delivery/deliveryAPI";

export default function DeliverySearch() {
  const [customerCode, setCustomerCode] = useState("");

 
  const { data, isLoading, isError } = useGetCustomerCodeSuggestionsQuery({
    input: "W",
    maxResults: 5,
  });

 
  const { data: searchData, isLoading: searchLoading, isError: searchError } =
    useGetSearchDeliveryInvoicesQuery({
      customerCode: customerCode || "CUS001", 
    })

  console.log("Suggestions data:", data);
  console.log("Invoice search data:", searchData);

  if (isLoading || searchLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (isError || searchError) {
    return (
      <div className="text-center text-red-500">
        Failed to load store tracking details.
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
          onChange={(e) => setCustomerCode(e.target.value)}
          placeholder="Enter Customer Code"
          className="w-full pl-9 pr-3 py-2 bg-gray-100"
        />

       
        {customerCode && (
  <ul className="absolute z-10 mt-1 border rounded-md bg-white shadow-lg w-full">
    <li
      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => setCustomerCode("CUS001")}
    >
      CUS001
    </li>
    <li
      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => setCustomerCode("CUS002")}
    >
      CUS002
    </li>
    <li
      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => setCustomerCode("CUS003")}
    >
      CUS003
    </li>
  </ul>
)}

      </div>

      <div className="flex items-center gap-2 w-1/2 pl-4">
        <Label className="text-xs font-medium">Dispatch No:</Label>
        <Label className="text-xs font-medium text-muted-foreground">2</Label>
      </div>
    </section>
  );
}
