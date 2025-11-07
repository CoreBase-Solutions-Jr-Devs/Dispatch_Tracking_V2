import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function DispatchRemarks({ enabled, handleDispatchRemarks }) {
  const [dispatchRemarks, setDispatchRemarks] = useState("");

  const handleChange = (e) => {
    setDispatchRemarks(e.target.value);
    handleDispatchRemarks(e.target.value);
  };

  return (
    <div className="flex flex-col mb-2 ">
      <Label className="text-xs font-medium">Dispatch Remarks:</Label>
      <Textarea
        className="min-w-[80px] bg-gray-300 border-gray-500 text-xs font-medium"
        value={dispatchRemarks}
        onChange={handleChange}
        disabled={!enabled}
      />
    </div>
  );
}
