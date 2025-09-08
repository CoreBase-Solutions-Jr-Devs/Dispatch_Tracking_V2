import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStorePushMutation,
  useStoreStartMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useTypedSelector } from "@/app/hook";

export default function StoreFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(
    rowData?.status === "Processed" || false
  );
  const [VerificationDisabled, setVerificationDisabled] = useState(
    rowData?.status === "Processed" || true
  );

  const [storeStart, { data, isLoading, isError }] = useStoreStartMutation();
  const [storePush] = useStorePushMutation();

  const { totalWeight, storeRemarks } = useTypedSelector(
    (state) => state.invoice
  );

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

    const payload = {
      docNum: Number(rowData.invoiceNo),
      totalWeightKg: totalWeight || 0,
      storeRemarks: storeRemarks || "",
    };
    storePush(payload)
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
        onClick={handleVerification}
        disabled={VerificationDisabled}
        className="mt-2 uppercase"
      >
        Send to Verification
      </Button>
    </div>
  );
}
