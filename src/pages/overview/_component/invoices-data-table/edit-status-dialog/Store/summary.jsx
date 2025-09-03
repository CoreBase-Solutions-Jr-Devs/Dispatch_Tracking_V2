import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hook";
import { setStoreTotalWeight } from "@/features/invoices/invoiceSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function StoreSummary({ data }) {
  const [totalWeight, setTotalWeight] = useState(data?.totalWeightKg);

  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    setTotalWeight(e.target.value);
    dispatch(setStoreTotalWeight(e.target.value));
  };
  return (
    <section className="flex flex-row justify-between items-center mb-2">
      <div className="flex items-center">
        <Label>Items:</Label>
        <Label className="ml-2">{data?.totalCount}</Label>
      </div>
      <div className="flex items-center">
        <Label>Total Weight (kg):</Label>
        <Input
          type="number"
          // defaultValue={data.totalWeight}
          defaultValue={totalWeight}
          className="w-20 ml-2 h-8"
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
