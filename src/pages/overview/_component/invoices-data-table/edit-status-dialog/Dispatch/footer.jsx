import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSaveSelectionsMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";

export default function DispatchFooter({ rowData, onSubmit, selectValues, onClose }) {
  const [startDisabled, setStartDisabled] = useState(true);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(false);

  const [saveSelections,{ data, isLoading, isError }] = useSaveSelectionsMutation(); // Save selections API

  const handleStart = (data) => {
    setStartDisabled(true);
    saveSelections(data);
    const payload = {
      dispatchIds: [data?.dispatchIds],
    }
    console.log(data);
    handleSaveApi(payload);
    setStartDisabled(false);
    setDeliveryDisabled(false);
    if (onClose) onClose();
  };

  const handleSaveApi = (data) => {
    saveSelections(data)
    .unwrap()
    .then((data) => {
      console.log("Selected Invoices:", data);
      toast.success("Successfully saved invoices!")
    })
    .catch((error) => {
        let description = "Error saving invoices. Please try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Error saving invoices!", { description, duration: 4000 });
    })
  }

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
        Close
      </Button>
    </div>
  );
}
