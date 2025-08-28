import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DispatchFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);

  const handleStart = () => {
    setStartDisabled(true);
    setDeliveryDisabled(false);
    if (onClose) onClose();
  };

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
        className="mt-2 mr-2 uppercase"
      >
        Dispatch
      </Button>
      <Button
        variant="verification"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-2 mr-2 uppercase"
      >
        Print
      </Button>
      <Button
        variant="secondary"
        onClick={handleDelivery}
        disabled={deliveryDisabled}
        className="mt-2 uppercase "
      >
        Remove
      </Button>
    </div>
  );
}
