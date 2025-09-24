import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DispatchFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [recallDisabled, setRecallDisabled] = useState(true);

  const handleStart = () => {
    setStartDisabled(true);
    setDeliveryDisabled(false);
    if (onClose) onClose();
  };

  const handleRecall =() => {
    setStartDisabled(true);
    setRecallDisabled(false);
  }

  const handleDelivery = () => {
    setStartDisabled(true);
    setDeliveryDisabled(true);
    if (onSubmit) onSubmit(rowData);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="apply"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Start
      </Button>
      <Button
        variant="verification"
        onClick={handleRecall}
        disabled={recallDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Save
      </Button>
      <Button
        variant="apply"
        onClick={handleDelivery}
        disabled={deliveryDisabled}
        className="mt-1 uppercase text-xs font-medium "
      >
        Send to Dispatch
      </Button>
    </div>
  );
}
