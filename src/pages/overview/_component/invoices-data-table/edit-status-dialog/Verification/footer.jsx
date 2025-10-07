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
const handleStartApi = () => {
  setStartDisabled(true);
  setDispatchDisabled(true);
 console.log("RowData object:", rowData);
  const docNum = Number(rowData.docNo); 
  console.log("docNum:", docNum);

  verificationStart(docNum)
    .unwrap()
    .then(() => {
      toast.success("Verification process started successfully");
      setDispatchDisabled(false);
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

      toast.error("Verification start failed", { description, duration: 4000 });
    });
};
  // ✅ Start Verification
  const handleDispatch = async () => {
    const isRemarksEmpty = remarks === null || remarks.trim() === "";
    const fieldErrors = {};

    // (optional validation if you want remarks to be required)
    // if (isRemarksEmpty) fieldErrors.remarks = "Remarks is required";

    setErrors({ remarks: fieldErrors.remarks || undefined });

    // if (isRemarksEmpty) return; // (disabled intentionally)

    setStartDisabled(true);
    setDispatchDisabled(true);

    const payload = {
      docNum: Number(rowData.docNo),
      
      totalWeightKg: rowData.totalWeightKg ?? 0,
      verificationRemarks: remarks ?? "",
    };

    verificationPush(payload)
      .unwrap()
      .then(() => {
        toast.success("Sent to Dispatch successfully");
        setTimeout(() => {
          setErrors({});
        }, 50);
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

        toast.error("Send to Dispatch failed", {
          description,
          duration: 4000,
        });
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
