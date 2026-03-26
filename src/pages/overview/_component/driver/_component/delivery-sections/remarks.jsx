import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function DeliveryRemarks({ handleParentRemarks }) {
  const [remarks, setRemarks] = useState("");

  const handleRemarks = (e) => {
    setRemarks(e.target.value);
    handleParentRemarks(e.target.value);
  };

  return (
    <div className="flex flex-col mb-2">
      <Label className="text-xs font-medium ">Comments:</Label>
      <Textarea
        className="w-full bg-gray-300 text-xs font-medium"
        value={remarks}
        onChange={handleRemarks}
      />
    </div>
  );
}
