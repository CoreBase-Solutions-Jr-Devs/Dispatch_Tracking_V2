import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function StoreRemarks({ data }) {
  const [remarks, setReamrks] = useState(data?.storeRemarks);

  const handleChange = (e) => {
    setReamrks(e.target.value);
  };

  return (
    <div className="flex flex-col mb-2">
      <Label>Store Remarks:</Label>
      <Textarea
        className="min-w-[80px] bg-gray-300"
        value={remarks}
        onChange={handleChange}
      />
    </div>
  );
}
