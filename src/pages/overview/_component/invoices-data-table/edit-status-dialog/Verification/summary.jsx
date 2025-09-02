import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function VerificationSummary({ data }) {
  const [totalWeight, setTotalWeight] = useState(data?.totalWeightKg);

  const handleChange = (e) => {
    setTotalWeight(e.target.value);
    //   dispatch(setStoreTotalWeight(e.target.value));
  };
  return (
    <section className="flex flex-row justify-between items-center mb-2">
      <div className="flex items-center">
        <Label>Items:</Label>
        <Label className="ml-2">{data?.items}</Label>
      </div>
      <div className="flex items-center">
        <Label>Total Weight (kg):</Label>
        <Input
          type="number"
          defaultValue={data.totalWeight}
          value={totalWeight}
          className="w-20 ml-2 h-8"
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
