import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function VerificationRemarks({
  data,
  readOnly,
  handleRemarksChange,
  error,
}) {
  const [remarks, setRemarks] = useState(data?.verifyRemarks || "");

  useEffect(() => {
    setRemarks(data?.verifyRemarks || "");
  }, [data?.verifyRemarks]);

  const handleChange = (e) => {
    setRemarks(e.target.value);
    handleRemarksChange(e.target.value);
  };

  if (!data) return null;

  return (
    <section className="flex flex-col mb-2 gap-y-2">
      <div className="flex items-center gap-x-1">
        <Label className="text-xs font-medium">Verification Remarks:</Label>
      </div>
      <Textarea
        className="min-w-[80px] bg-gray-300 h-20"
        value={remarks}
        onChange={handleChange}
        readOnly={data?.workflowStatus === "Verified"}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </section>
  );
}
