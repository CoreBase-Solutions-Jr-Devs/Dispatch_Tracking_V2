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
        onClick={handleRecall}
        disabled={recallDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Recall
      </Button>
      <Button
        variant="apply"
        onClick={handleDelivery}
        disabled={deliveryDisabled}
        className="mt-1 uppercase text-xs font-medium "
      >
        Dispatch
      </Button>
    </div>
  );
}
