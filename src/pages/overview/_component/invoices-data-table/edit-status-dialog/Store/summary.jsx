import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hook";
import { setStoreTotalWeight } from "@/features/invoices/invoiceSlice";
import { useState } from "react";

function SummaryRow({ label, value }) {
  return (
    <section className="grid grid-cols-[130px_1fr] items-center">
      <Label>{label}:</Label>
      <Label>{value || "N/A"}</Label>
    </section>
  );
}

export default function StoreSummary({ data, readOnly }) {
  const [totalWeight, setTotalWeight] = useState(data?.totalWeightKg || 0);
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setTotalWeight(value);
    dispatch(setStoreTotalWeight(value));
  };

  if (!data) return null;

  return (
    <section className="flex flex-row justify-start items-center mb-2 gap-x-10">
      <div className="flex items-center gap-x-1">
        <Label className="text-xs font-medium">Items:</Label>
        <Label className="text-xs font-medium text-muted ml-1">
          {data?.totalCount || 0}
        </Label>
      </div>
      <div className="flex items-center gap-x-1">
        <Label className="text-xs font-medium">Total Weight (kg):</Label>
        <Input
          type="number"
          value={totalWeight}
          className="w-20 h-8 text-xs font-medium text-muted"
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
    </section>
  );
}
