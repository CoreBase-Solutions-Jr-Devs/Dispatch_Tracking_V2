import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function VerificationSummary({
  data,
  readOnly,
  handleWeightChange,
  error,
}) {
const [weight, setWeight] = useState(data?.totalWeightKg ?? 0);

 useEffect(() => {
  setWeight(data?.totalWeightKg ?? 0);
}, [data?.totalWeightKg]);


  const handleChange = (e) => {
    setWeight(e.target.value);
    handleWeightChange(e.target.value);
  };

  if (!data) return null;

  return (
    <section className="flex flex-row justify-start items-center mb-2 gap-x-20">
      <div className="flex items-center gap-x-2">
        <Label className="text-xs font-medium">Items:</Label>
        <Label className="text-xs font-medium ">{data?.items}</Label>
      </div>
      <div className="flex items-center gap-x-2">
        <Label className="text-xs font-medium">Total Weight (kg):</Label>
        <Input
          type="number"
          value={weight}
          className="w-20 h-8 text-xs font-medium "
          onChange={handleChange}
          readOnly={data?.workflowStatus === "Verified"}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </section>
  );
}
