import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useVerificationStartMutation,
  useVerificationPushMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";

export default function VerificationFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [dispatchDisabled, setDispatchDisabled] = useState(true);

  const [verificationStart, { data, isLoading, isError }] =
    useVerificationStartMutation();
  const [verificationPush] = useVerificationPushMutation();

  const handleStart = () => {
    setStartDisabled(true);
    setDispatchDisabled(false);

    verificationStart(Number(rowData.invoiceNo))
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

  const handleDispatch = () => {
    setStartDisabled(true);
    setDispatchDisabled(true);

    const payload = {
      docNum: Number(rowData.invoiceNo),
      totalWeightKg: 0,
      storeRemarks: "",
    };

    verificationPush(payload)
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
        onClick={handleDispatch}
        disabled={dispatchDisabled}
        className="mt-2 uppercase"
      >
        Send to Dispatch
      </Button>
    </div>
  );
}
