import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useVerificationStartMutation,
  useVerificationPushMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";
import EditStatusDialog from "../edit-status-dialog";

export default function VerificationFooter({
  rowData,
  onSubmit,
  onClose,
  remarks,
  errors,
  setErrors,
  refetchData,
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
      .then(() => {
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
    const isRemarksEmpty = !remarks || remarks.trim() === "";

    const fieldErrors = {};
    if (isRemarksEmpty) fieldErrors.remarks = "Remarks is required";

    setErrors({
      remarks: fieldErrors.remarks || undefined,
    });

    if (Object.keys(fieldErrors).length > 0) return;

    setStartDisabled(true);
    setDispatchDisabled(true);

    const payload = {
      docNum: Number(rowData.invoiceNo),
      verificationRemarks: remarks || null,
    };

    verificationPush(payload)
      .unwrap()
      .then(() => {
        toast.success("Sent to Dispatch successfully");
        setRemarks("");
        setErrors({});
        if (refetchData) refetchData();
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
    <div className="flex flex-row justify-between w-full">
      <EditStatusDialog
        rowData={rowData}
        view="verificationstart"
        onSubmit={handleStartApi}
      >
        <Button
          variant="default"
          disabled={startDisabled}
          className="mt-2 mr-2 uppercase"
        >
          Start
        </Button>
      </EditStatusDialog>

      <Button
        variant="apply"
        onClick={handleDispatch}
        disabled={dispatchDisabled}
        className="mt-2 uppercase"
      >
        Send to Dispatch
      </Button>
      <Button
        variant="destructive"
        onClick={handleClose}
        className="mt-2 mr-2 uppercase"
      >
        Close
      </Button>
    </div>
  );
}
