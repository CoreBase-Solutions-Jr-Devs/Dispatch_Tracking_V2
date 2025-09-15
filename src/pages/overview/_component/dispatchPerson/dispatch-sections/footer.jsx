import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DispatchFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [DispatchDisabled, setDispatchDisabled] = useState(true);

  const handleStart = () => {
    setStartDisabled(true);
    setDispatchDisabled(false);
    if (onClose) onClose();
  };

  const handleDispatch = () => {
    setStartDisabled(true);
    setDispatchDisabled(true);
    if (onSubmit) onSubmit(rowData);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-row justify-between w-full">
      <Button
        variant="verification"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Print
      </Button>
      <Button
        variant="destructive"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Remove
      </Button>
      <Button
        variant="apply"
        onClick={handleDispatch}
        disabled={DispatchDisabled}
        className="mt-1 uppercase text-xs font-medium "
      >
        Dispatch
      </Button>
    </div>
  );
}
