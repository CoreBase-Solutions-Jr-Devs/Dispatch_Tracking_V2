import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartStoreProcessMutation,
  usePushStoreInvoiceMutation,
} from "@/features/store/storeAPI";

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

  const [storeStart] = useStartStoreProcessMutation();
  const [storePush] = usePushStoreInvoiceMutation();


const handleStartApi = () => {
  setStartDisabled(true);
  setVerificationDisabled(true);
 console.log("RowData object:", rowData);
  const docNum = Number(rowData.DocNo); 
  console.log("docNum:", docNum);

  storeStart(docNum)
    .unwrap()
    .then(() => {
      toast.success("Store process started successfully");
      setVerificationDisabled(false);
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

      toast.error("Store start failed", { description, duration: 4000 });
    });
};


  const handleVerification = async () => {
    const isRemarksEmpty = remarks === null || remarks.trim() === "";
    const fieldErrors = {};

    // (optional validation if you want remarks to be required)
    // if (isRemarksEmpty) fieldErrors.remarks = "Remarks is required";

    setErrors({ remarks: fieldErrors.remarks || undefined });

    // if (isRemarksEmpty) return; // (disabled intentionally)

    setStartDisabled(true);
    setVerificationDisabled(true);

    const payload = {
      docNum: Number(rowData.DocNo),
      totalWeightKg: rowData.totalWeightKg ?? 0,
      totalWeightKg: rowData.totalWeightKg ?? 0,
      storeRemarks: remarks ?? "",
    };

    storePush(payload)
      .unwrap()
      .then(() => {
        toast.success("Sent to Verification successfully");
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

      <EditStatusDialog
        view="storepush"
        rowData={rowData}
        onSubmit={handleVerification}
      >
        <Button
          variant="apply"
          disabled={verificationDisabled}
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
