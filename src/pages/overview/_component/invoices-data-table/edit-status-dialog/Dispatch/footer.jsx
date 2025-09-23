import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSaveSelectionsMutation } from "@/features/dispatch/dispatchAPI";

export default function DispatchFooter({ rowData, onSubmit, selectValues, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(false);

  const handleStart = () => {
    setStartDisabled(true);
    setDeliveryDisabled(false);
    if (onClose) onClose();
  };

  const handleCancel =() => {
    setStartDisabled(true);
    setCancelDisabled(false);
    if (onClose) onClose();
  }

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="apply"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Save
      </Button>
      <Button
        variant="destructive"
        onClick={handleCancel}
        disabled={cancelDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Cancel
      </Button>
    </div>
  );
}
