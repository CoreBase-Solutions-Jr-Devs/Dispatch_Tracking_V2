import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useCreateDispatchesMutation,
  useRecallInvoicesMutation,
  useSaveSelectionsMutation,
} from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";
import { setSelectedDipatches } from "@/features/dispatch/dispatchSlice";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import EditStatusDialog from "../edit-status-dialog";

export default function DispatchFooter({
  rowData,
  selectedRow = {},
  selectedDocs = [],
  onSubmit,
  selectValues,
  onClose,
  handleRowSelect,
}) {
  const [startDisabled, setStartDisabled] = useState(true);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(false);

  const { user } = useTypedSelector((state) => state.auth);

  const { updatedDispatches } = useTypedSelector((state) => state.dispatch);

  const dispatch = useAppDispatch();

  const [saveSelections, { data, isLoading }] = useSaveSelectionsMutation(); // Save selections API
  // const [createDispatches, { isLoading }] = useCreateDispatchesMutation(); // Save selections API

  const [recallInvoices, { isLoading: recalLoading }] =
    useRecallInvoicesMutation(); // recall invoice API

  const handleSave = async () => {
    if (!selectedDocs.length) return;

    const payload = {
      dispatchIds: selectedDocs.map((doc) => doc.dispatchId),
      userName: user?.username || "",
      existingDispatchNumber: updatedDispatches?.dispatchNumber || 0,
      // existingDispatchNumber: 0,
    };

    if (payload.existingDispatchNumber === 0) {
      delete payload.existingDispatchNumber;
    }

    try {
      const res = await saveSelections(payload).unwrap();
      toast.success("Successfully saved invoices!");
      dispatch(
        setSelectedDipatches(
          res || {
            dispatchNumber: 0,
            dispatchIds: [],
          }
        )
      );
      handleRowSelect({});
      console.log(res);
      if (onSubmit) {
        onSubmit(selectedDocs, selectValues);
      }
      if (onClose) onClose();
    } catch (error) {
      let description = "Error saving invoices. Please try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) {
        description = error.data.message;
      }
      toast.error("Error saving invoices!", { description, duration: 4000 });
    }
  };

  // const handleSave = async () => {
  //   if (!selectedDocs.length) return;

  //   const payload = {
  //     //
  //     userName: user?.username || "",
  //     dispatchnum: 0,
  //     invoices: selectedDocs.map((doc) => {
  //       return {
  //         // doc.dispatchId
  //         cus_code: doc.customerCode,
  //         saleinv_num: doc.docNo,
  //         doctype: doc.docType,
  //       };
  //     }),
  //   };

  //   console.log(payload);

  //   try {
  //     const res = await createDispatches(payload).unwrap();
  //     toast.success("Successfully saved invoices!");
  //     // dispatch(setSelectedDipatches(res?.updatedDispatches || []));
  //     handleRowSelect({});
  //     console.log(res);
  //     if (onSubmit) {
  //       onSubmit(selectedDocs, selectValues);
  //     }
  //     if (onClose) onClose();
  //   } catch (error) {
  //     let description = "Error saving invoices. Please try again.";
  //     if (error?.data?.errors) {
  //       const errorMessages = Object.values(error.data.errors).flat();
  //       if (errorMessages.length > 0) description = errorMessages.join(" ");
  //     } else if (error?.data?.message) {
  //       description = error.data.message;
  //     }
  //     toast.error("Error saving invoices!", { description, duration: 4000 });
  //   }
  // };

  const handleClose = () => {
    if (onClose) onClose();
  };
  // useRecallInvoicesMutation
  const handleRecall = async () => {
    const payload = {
      docNo: selectedRow?.docNo || 0,
      currentStage: 3,
      targetStage: 2,
      targetStatus: 3,
      recalledBy: user?.username || "",
    };

    try {
      const res = await recallInvoices(payload).unwrap();
      toast.success("Successfully recalled invoices!");
      handleRowSelect({});
      // if (onSubmit) {
      //   onSubmit(selectedDocs, selectValues);
      // }
    } catch (error) {
      let description = "Error recalling invoices. Please try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) {
        description = error.data.message;
      }
      toast.error("Error  invoices!", { description, duration: 4000 });
    }
  };

  return (
    <div className="flex flex-row justify-end w-full">
      {/* <EditStatusDialog
        rowData={rowData}
        view="dispatchpick"
        onSubmit={handleSave}
      >
        <Button
          variant="apply"
          // onClick={handleSave}
          disabled={isLoading || !selectedDocs.length}
          className="mt-1 mr-2 uppercase text-xs font-medium"
        >
          {isLoading ? "Picking..." : "Pick"}
        </Button>
      </EditStatusDialog> */}
      <Button
        variant="apply"
        onClick={handleSave}
        disabled={isLoading || !selectedDocs.length}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        {isLoading ? "Picking..." : "Pick"}
      </Button>
      <Button
        variant="destructive"
        onClick={handleRecall}
        disabled={isLoading || recalLoading || !Object.keys(selectedRow).length}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Recall Invoice
      </Button>
      <Button
        variant="ghost"
        onClick={handleClose}
        disabled={cancelDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Close
      </Button>
    </div>
  );
}
