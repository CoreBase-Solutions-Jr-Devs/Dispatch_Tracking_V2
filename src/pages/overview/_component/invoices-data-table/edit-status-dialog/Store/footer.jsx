import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStorePushMutation,
  useStoreStartMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";
import StoreStartPopup from "./startpopup";

export default function StoreFooter({
  rowData,
  onSubmit,
  onClose,
  weight,
  remarks,
  errors,
  setErrors,
  refetchData,
  setWeight,
  setRemarks,
}) {
  const [startDisabled, setStartDisabled] = useState(
    rowData?.workflowStatus === "Processed" ||
      rowData?.storeStartDateTime ||
      false
  );

  const [verificationDisabled, setVerificationDisabled] = useState(
    rowData?.workflowStatus !== "In Process" || !rowData?.storeStartDateTime
  );

  const [storeStart] = useStoreStartMutation();
  const [storePush] = useStorePushMutation();

  const handleStartApi = () => {
    setStartDisabled(true);
    setVerificationDisabled(true);

    storeStart(Number(rowData.invoiceNo))
      .unwrap()
      .then((data) => {
        console.log(data);
        toast.success("Store process started successfully");

        setVerificationDisabled(false);

        if (refetchData) refetchData();

        // ✅ Close parent popup after success
        if (onClose) onClose();
      })
      .catch((error) => {
        setStartDisabled(false);
        setVerificationDisabled(true);

        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Store start Failed", { description, duration: 4000 });
      });
  };

  const handleVerification = () => {
    const isWeightEmpty = weight === "" || weight === null;
    const isRemarksEmpty = !remarks || remarks.trim() === "";

    const fieldErrors = {};
    if (isWeightEmpty) fieldErrors.weight = "Weight is required";
    if (isRemarksEmpty) fieldErrors.remarks = "Remarks is required";

    setErrors({
      weight: fieldErrors.weight || undefined,
      remarks: fieldErrors.remarks || undefined,
    });

    if (isWeightEmpty && isRemarksEmpty) {
      setWeight(0);
      setRemarks("");
      return;
    }

    if (Object.keys(fieldErrors).length > 0) return;

    setStartDisabled(true);
    setVerificationDisabled(true);

    const payload = {
      docNum: Number(rowData.invoiceNo),
      totalWeightKg: Number(weight),
      storeRemarks: remarks,
    };

    storePush(payload)
      .unwrap()
      .then((data) => {
        toast.success("Sent to Verification successfully");
        setWeight(undefined);
        if (refetchData) refetchData();
        setRemarks("");
        setErrors({});
      })
      .catch((error) => {
        setStartDisabled(false);
        setVerificationDisabled(false);
        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Send to Verification failed", {
          description,
          duration: 4000,
        });
      });
  };

  const handleClose = () => onClose();

  return (
    <div className="flex flex-row justify-end w-full">
      <StoreStartPopup
        rowData={rowData}
        onConfirm={(confirmed) => {
          if (confirmed) handleStartApi();
        }}
      >
        <Button
          variant="default"
          disabled={startDisabled}
          className="mt-2 mr-2 uppercase"
        >
          Start
        </Button>
      </StoreStartPopup>

      <Button
        variant="apply"
        onClick={handleVerification}
        disabled={verificationDisabled}
        className="mt-2 uppercase"
      >
        Send to Verification
      </Button>
      <Button
        variant="destructive"
        onClick={handleClose}
        className="mt-2 mr-2 uppercase"
      >
        Cancel
      </Button>
    </div>
  );
}
