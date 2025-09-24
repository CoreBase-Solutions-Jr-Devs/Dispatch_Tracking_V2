import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStoreStartMutation,
  useStorePushMutation,
} from "@/features/invoices/invoicesAPI";
import { toast } from "sonner";
import EditStatusDialog from "../edit-status-dialog";

export default function StoreFooter({
  rowData,
  onSubmit,
  onClose,
  remarks,
  errors,
  setErrors,
  refetchData,
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

   
    const invoiceNo = Number(rowData.invoiceNo);

    storeStart(invoiceNo)
      .unwrap()
      .then(() => {
        toast.success("Store process started successfully");

        setVerificationDisabled(false);

        if (refetchData) setTimeout(() => refetchData(), 50);
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
    const isRemarksEmpty = remarks === null || remarks.trim() === "";

    const fieldErrors = {};
    // if (isRemarksEmpty) fieldErrors.remarks = "Remarks is required";

    setErrors({
      remarks: fieldErrors.remarks || undefined,
    });

    // if (isRemarksEmpty) return; // no longer required

    setStartDisabled(true);
    setVerificationDisabled(true);

    const payload = {
      docNum: Number(rowData.invoiceNo),
      storeRemarks: remarks ?? "",
    };

    storePush(payload)
      .unwrap()
      .then(() => {
        toast.success("Sent to Verification successfully");
        setTimeout(() => {
          setRemarks(null);
          setErrors({});
        }, 50);
        if (refetchData) refetchData();
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
    <div className="flex flex-row justify-between w-full">
      <EditStatusDialog
        view="storestart"
        rowData={rowData}
        onSubmit={handleStartApi}
      >
        <Button
          variant="default"
          disabled={startDisabled}
          className="mt-2 uppercase"
        >
          Start
        </Button>
      </EditStatusDialog>

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
        Close
      </Button>
    </div>
  );
}
