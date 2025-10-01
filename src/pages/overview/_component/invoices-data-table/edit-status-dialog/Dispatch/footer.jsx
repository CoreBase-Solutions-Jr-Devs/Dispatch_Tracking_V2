import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSaveSelectionsMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";

export default function DispatchFooter({ rowData, selectedDocs = [], onSubmit, selectValues, onClose }) {
  const [startDisabled, setStartDisabled] = useState(true);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(false);

  const [saveSelections,{ data, isLoading, isError }] = useSaveSelectionsMutation(); // Save selections API

  const handleSave = async () => {
    if (!selectedDocs.length) return;

    const payload = {
      dispatchIds: selectedDocs.map((doc) => doc.dispatchId),
    };

    try {
      const res = await saveSelections(payload).unwrap();
      toast.success("Successfully saved invoices!");
      console.log(res);
      if (onSubmit) {
        onSubmit(selectedDocs, selectValues);
      }
      if (onClose) onClose();
    } catch (error) {
      let description = "Error saving invoices. Please try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) {
        description = error.data.message;
      }
      toast.error("Error saving invoices!", { description, duration: 4000 });
    }
  };

  const handleClose =() => {
    if (onClose) onClose();
  }

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="apply"
        onClick={handleSave}
        disabled={isLoading || !selectedDocs.length}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        {isLoading ? "Saving..." : "Save"}
      </Button>
      <Button
        variant="destructive"
        onClick={handleClose}
        disabled={cancelDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Close
      </Button>
    </div>
  );
}
