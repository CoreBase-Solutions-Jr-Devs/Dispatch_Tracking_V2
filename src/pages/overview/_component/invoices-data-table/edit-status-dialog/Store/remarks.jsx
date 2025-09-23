import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function StoreRemarks({
  data,
  readOnly,
  handleRemarksChange,
  error,
}) {
  console.log("Remarks Data:", data);

  const [remarks, setRemarks] = useState(data?.storeRemarks || "");

  useEffect(() => {
    setRemarks(data?.storeRemarks || "");
  }, [data?.storeRemarks]);

  const handleChange = (e) => {
    setRemarks(e.target.value);
    handleRemarksChange(e.target.value);
  };
  if (!data) return null;

  return (
    <section className="flex flex-col mb-2 gap-y-2">
      <div className="flex items-center gap-x-1">
        <Label className="text-xs font-medium">Store Remarks:</Label>
      </div>
      <Textarea
        className="min-w-[80px] bg-gray-100 h-20 border border-gray-300 rounded-md text-xs font-medium"
        value={remarks}
        onChange={handleChange}
        // readOnly={readOnly}
        readOnly={data?.workflowStatus === "Processed"}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </section>
  );
}
