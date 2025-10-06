import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartVerificationProcessMutation,
  usePushVerificationInvoiceMutation,
} from "@/features/verification/verificationAPI";
import { toast } from "sonner";
import EditStatusDialog from "../edit-status-dialog";
import VerificationRemarks from "./remarks";

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

  // ✅ Start Verification
  const handleStartApi = async () => {
    setStartDisabled(true);
    setDispatchDisabled(true);

    const docNum = Number(rowData.docNo);

    try {
      await verificationStart(docNum).unwrap();
      toast.success("Verification process started successfully");
      setDispatchDisabled(false);

      if (refetchData) {
        setTimeout(() => refetchData(), 100);
      }
    } catch (error) {
      setStartDisabled(false);
      setDispatchDisabled(true);

      let description = "Please check your credentials and try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) {
        description = error.data.message;
      }

      toast.error("Verification start failed", {
        description,
        duration: 4000,
      });
    }
  };

  // ✅ Send to Verification
  const handleDispatch = async () => {
    const isRemarksEmpty = !remarks?.trim();
    const fieldErrors = {};

    if (isRemarksEmpty) {
      fieldErrors.remarks = "Remarks are required.";
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStartDisabled(true);
    setDispatchDisabled(true);

    const payload = {
      docNum: Number(rowData.docNo),
      totalWeightKg: rowData.totalWeightKg ?? 0,
      verificationRemarks: remarks ?? "",
    };

    try {
      await verificationPush(payload).unwrap();
      toast.success("Sent to Verification successfully");

      if (refetchData) {
        setTimeout(() => refetchData(), 100);
      }

      setTimeout(() => setErrors({}), 50);
    } catch (error) {
      setStartDisabled(false);
      setDispatchDisabled(false);

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
    }
  };

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
          Send to Dispatch
        </Button>
      </EditStatusDialog>

      <Button
        variant="destructive"
        onClick={onClose}
        className="mt-2 mr-2 uppercase"
      >
        Close
      </Button>
    </div>
  );
}
