import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStorePushMutation,
  useStoreStartMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";

export default function StoreFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [VerificationDisabled, setVerificationDisabled] = useState(true);

  const [storeStart, { data, isLoading, isError }] = useStoreStartMutation();
  const [storePush] = useStorePushMutation();

  const handleStart = () => {
    setStartDisabled(true);
    setVerificationDisabled(false);

    storeStart(Number(rowData.invoiceNo))
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) {
            description = errorMessages.join(" ");
          }
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("store start Failed", {
          description: description,
          duration: 4000,
        });
      });

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
        disabled={startDisabled || isLoading}
        className="mt-2 mr-2 uppercase"
      >
        {isLoading ? "Starting..." : "Start"}
      </Button>
      <Button
        variant="apply"
        onClick={handleVerification}
        disabled={verificationDisabled || isPushing}
        className="mt-2 uppercase"
      >
        {isPushing ? "Sending..." : "Send to Verification"}
      </Button>
    </div>
  );
}
