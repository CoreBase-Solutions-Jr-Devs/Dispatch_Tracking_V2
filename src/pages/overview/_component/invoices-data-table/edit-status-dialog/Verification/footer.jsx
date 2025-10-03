import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartVerificationProcessMutation,
  usePushVerificationInvoiceMutation,
} from "@/features/verification/verificationAPI";
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

  const [verificationStart] = useStartVerificationProcessMutation();
  const [verificationPush] = usePushVerificationInvoiceMutation();

  const handleStartApi = async () => {
    setStartDisabled(true);
    setDispatchDisabled(true);

    const invoiceNo = Number(rowData.invoiceNo);
    console.log("Starting verification for invoiceNo:", invoiceNo);

    try {
      const res = await verificationStart( invoiceNo ).unwrap();
      console.log("Start API response:", res);

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Verification started successfully");

      if (refetchData) {
        try {
          await refetchData();
        } catch (err) {
          console.error("Refetch failed:", err);
        }
      }

      setDispatchDisabled(false);
    } catch (error) {
      console.error("Start API failed:", error);
      setStartDisabled(false);
      setDispatchDisabled(true);

      let description = "Please check your credentials and try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) {
        description = error.data.message;
      } else if (error?.message) {
        description = error.message;
      }

      toast.error("Verification start Failed", { description, duration: 4000 });
    }
  };

  const handleDispatch = async () => {
    const isRemarksEmpty = !remarks || remarks.trim() === "";
    console.log("Dispatching verification with remarks:", remarks);

    const fieldErrors = {};

    setErrors({
      remarks: fieldErrors.remarks || undefined,
    });

    if (Object.keys(fieldErrors).length > 0) return;

    setStartDisabled(true);
    setDispatchDisabled(true);

    const payload = {
      docNum: Number(rowData.invoiceNo),
      totalWeightKg: rowData.totalWeightKg ?? 0,
      storeRemarks: remarks ?? "",
    };
    console.log("Dispatch payload:", payload);

    try {
      const res = await verificationPush(payload).unwrap();
      console.log("Dispatch API response:", res);

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Sent to Dispatch successfully");

      setErrors({});
      setRemarks(null);

      if (refetchData) {
        try {
          await refetchData();
        } catch (err) {
          console.error("Refetch failed:", err);
        }
      }

      setStartDisabled(true);
      setDispatchDisabled(true);
    } catch (error) {
      console.error("Dispatch API failed:", error);
      setStartDisabled(false);
      setDispatchDisabled(false);

      let description = "Please check your credentials and try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) {
        description = error.data.message;
      } else if (error?.message) {
        description = error.message;
      }

      toast.error("Send to Dispatch Failed", {
        description,
        duration: 4000,
      });
    }
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
      <EditStatusDialog
        view="verificationpush"
        rowData={rowData}
        onSubmit={handleDispatch}
      >
        <Button
          variant="apply"
          disabled={dispatchDisabled}
          className="mt-2 uppercase"
        >
          Send to Verification
        </Button>
      </EditStatusDialog>

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
