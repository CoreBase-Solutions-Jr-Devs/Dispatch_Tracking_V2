import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DeliveryFooter({ rowData, onSubmit, onClose }) {
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
    <div className="flex flex-row justify-between max-w-3xl gap-16">
      <Button
        variant="default"
        onClick={handleStart}
        className="mt-1 uppercase text-xs font-medium"
      >
        Print
      </Button>
      <Button
        variant="dispatch"
        onClick={handleStart}
        className="mt-1  uppercase text-xs font-medium"
      >
        Delivery Note
      </Button>
      <Button
        variant="apply"
        onClick={handleDelivery}
        className="mt-1  uppercase text-xs font-medium"
      >
        Complete
      </Button>
    </div>
  );
}
