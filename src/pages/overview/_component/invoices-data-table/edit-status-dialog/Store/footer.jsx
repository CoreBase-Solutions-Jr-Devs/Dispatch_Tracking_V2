import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function StoreFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [VerificationDisabled, setVerificationDisabled] = useState(true);

  const handleStart = () => {
    setStartDisabled(true);
    setVerificationDisabled(false);
    if (onClose) onClose();
  };

  const handleVerification = () => {
    setStartDisabled(true);
    setVerificationDisabled(true);
    if (onSubmit) onSubmit(rowData);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="verification"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-2 mr-2 uppercase"
      >
        Start
      </Button>
      <Button
        variant="apply"
        onClick={handleVerification}
        disabled={VerificationDisabled}
        className="mt-2 uppercase"
      >
        Send to Verification
      </Button>
    </div>
  );
}
