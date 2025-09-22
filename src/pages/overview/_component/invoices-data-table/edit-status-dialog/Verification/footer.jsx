import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useVerificationStartMutation,
  useVerificationPushMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";
import VerificationStartPopup from "./startpopup.jsx";

export default function VerificationFooter({
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
    rowData?.workflowStatus === "Verified" ||
      rowData?.verifyStartDateTime ||
      false
  );

  const [dispatchDisabled, setDispatchDisabled] = useState(
    rowData?.workflowStatus !== "In Verification" ||
      !rowData?.verifyStartDateTime
  );

  const [verificationStart] = useVerificationStartMutation();
  const [verificationPush] = useVerificationPushMutation();

  const handleStartApi = () => {
    setStartDisabled(true);
    setDispatchDisabled(true);

    verificationStart(Number(rowData.invoiceNo))
      .unwrap()
      .then((response) => {
        toast.success("Verification started successfully");

        setDispatchDisabled(false);

        if (refetchData) refetchData();
      })
      .catch((error) => {
        setStartDisabled(false);
        setDispatchDisabled(true);

        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Verification start Failed", {
          description,
          duration: 4000,
        });
      });
  };

  const handleDispatch = () => {
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
    setDispatchDisabled(true);

    const payload = {
      docNum: Number(rowData.invoiceNo),
      totalWeightKg: Number(weight), 
      verificationRemarks: remarks,
    };

    verificationPush(payload)
      .unwrap()
      .then((response) => {
        toast.success("Sent to Dispatch successfully");
        setWeight(undefined);
        if (refetchData) refetchData();
        setRemarks("");
        setErrors({});
      })
      .catch((error) => {
        setStartDisabled(false);
        setDispatchDisabled(false);

        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Send to Dispatch Failed", { description, duration: 4000 });
      });
  };

  const handleClose = () => onClose();

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="destructive"
        onClick={handleClose}
        className="mt-2 mr-2 uppercase"
      >
        Cancel
      </Button>

      <VerificationStartPopup
        rowData={rowData}
        onConfirm={(confirmed) => {
          if (confirmed) handleStartApi();
        }}
      >
        <Button
          variant="verification"
          disabled={startDisabled}
          className="mt-2 mr-2 uppercase"
        >
          Start
        </Button>
      </VerificationStartPopup>

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
